---
title: 事件系统
lang: zh_CN
---

# 事件系统

> 模块之间不想互相认识？那就通过事件喊话。

## 为什么要用事件？

假设玩家死了。你需要播放死亡音效、更新 UI、触发慢动作。直接调用的写法：

```cpp
// Player 里直接调三个模块
audio->playDeathSound();
ui->showDeathScreen();
time->setSlowMotion(0.3f);
```

Player 类里塞满了它不需要知道的东西。每加一个模块就要改 Player。耦合得像一碗浆糊。

用事件的话，Player 只管吼一嗓子：

```cpp
// Player 只发一条消息，不管谁接
EventBus::Emit(PlayerDeathEvent{this});
```

谁在乎谁去 Subscribe。Player 不认识 Audio、不认识 UI、不认识 Time。解耦到这种程度，改一个模块不会连累其他模块。

## 定义事件

任何继承 `Shit::Event` 的结构体都是事件：

```cpp
struct PlayerDeathEvent : public Shit::Event {
    int playerId;
    Shit::GameObject* killer;
};
```

事件就是数据容器。只放必要的信息，别往里面塞逻辑。

## 订阅事件

```cpp
uint64_t token = Shit::EventBus::Subscribe<PlayerDeathEvent>(
    [](const PlayerDeathEvent& e) {
        // 收到消息，干活
        AudioPlayer::Play("death.wav");
    }
);
```

`Subscribe` 返回一个令牌（token），退订要用它。

## 发送事件

```cpp
EventBus::Emit(PlayerDeathEvent{playerId, killer});
```

事件不会立即触发。它先被扔进队列，等 `ProcessEvents` 时才统一派发。

## 派发事件

```cpp
// 在 Game::run() 主循环的合适位置
EventBus::ProcessEvents();
```

一般在 SceneManager::Update 之前或之后调用——取决于你希望事件在什么时候被处理。

## 退订事件

> 不退订 = 野指针。监听者销毁前必须退订。

```cpp
EventBus::Unsubscribe<PlayerDeathEvent>(token);
```

典型的做法是在析构函数里退订：

```cpp
class AudioSystem {
    uint64_t m_token;

    AudioSystem() {
        m_token = EventBus::Subscribe<PlayerDeathEvent>(
            [this](const PlayerDeathEvent& e) {
                playDeathSound();
            }
        );
    }

    ~AudioSystem() {
        EventBus::Unsubscribe<PlayerDeathEvent>(m_token);
    }
};
```

## 清除事件

```cpp
EventBus::Clear<PlayerDeathEvent>();   // 清某一类监听器
EventBus::ClearAll();                  // 清所有
```

## 完整示例

```cpp
// 定义事件
struct ScoreEvent : public Shit::Event {
    int points;
    Shit::GameObject* source;
};

struct LevelUpEvent : public Shit::Event {
    int newLevel;
};

// UI 系统订阅
class UISystem {
    uint64_t m_scoreToken;
    uint64_t m_levelToken;

public:
    UISystem() {
        m_scoreToken = EventBus::Subscribe<ScoreEvent>(
            [this](const ScoreEvent& e) {
                updateScoreDisplay(e.points);
            }
        );
        m_levelToken = EventBus::Subscribe<LevelUpEvent>(
            [this](const LevelUpEvent& e) {
                showLevelUpEffect(e.newLevel);
            }
        );
    }

    ~UISystem() {
        EventBus::Unsubscribe<ScoreEvent>(m_scoreToken);
        EventBus::Unsubscribe<LevelUpEvent>(m_levelToken);
    }

    void updateScoreDisplay(int points) { /* ... */ }
    void showLevelUpEffect(int level) { /* ... */ }
};

// 游戏逻辑——只发事件，不管谁来接
void Enemy::onDeath() {
    EventBus::Emit(ScoreEvent{100, this});
}
```

## 什么时候用？

| ✅ 适合事件 | ❌ 不适合事件 |
|---|---|
| 玩家死亡、拾取道具、关卡加载 | 位置更新、每帧旋转 |
| 音效触发 | 渲染、物理 |
| UI 刷新通知 | 组件间紧耦合读写 |
| 跨模块通信 | 高频轮询 |

事件是解耦工具，不是万能药。低频、跨模块的通信用事件；高频、紧耦合的操作还是直接调函数稳。
