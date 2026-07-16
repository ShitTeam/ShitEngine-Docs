---
title: 事件系统
lang: zh_CN
---

# 事件系统

EventBus 提供类型安全的事件通信，让不同模块之间松耦合地交换信息。

## 为什么需要事件？

假设玩家死亡时需要播放音效、更新 UI、触发慢动作。用直接调用的方式：

```cpp
// Player 直接引用三个模块
audio->playDeathSound();
ui->showDeathScreen();
time->setSlowMotion(0.3f);
```

Player 知道了太多不该知道的事。用事件：

```cpp
// Player 只发一条消息
EventBus::Emit(PlayerDeathEvent{this});
```

谁关心谁订阅，互不干扰。这就是 EventBus 的价值。

## 定义事件

任何继承自 `Shit::Event` 的结构体都是事件：

```cpp
struct PlayerDeathEvent : public Shit::Event {
    int playerId;
    Shit::GameObject* killer;
};
```

事件本质就是数据容器。保持简单，只放你需要的信息。

## 订阅事件

```cpp
uint64_t token = Shit::EventBus::Subscribe<PlayerDeathEvent>(
    [](const PlayerDeathEvent& e) {
        // 处理玩家死亡
        AudioPlayer::Play("death.wav");
    }
);
```

`Subscribe` 返回一个 `token`，后续退订要用到它。

## 发送事件

```cpp
EventBus::Emit(PlayerDeathEvent{playerId, killer});
```

事件不会立即触发处理器。它被存入一个队列，在游戏循环的适当时刻统一派发。

## 派发事件

在游戏循环的合适位置调用 `ProcessEvents`：

```cpp
// Game::run() 中的合适位置
EventBus::ProcessEvents();
```

通常是每帧末尾、所有更新完成之后。

## 退订事件

当监听者的生命周期结束时，必须退订，否则后续事件派发会调用已销毁的对象：

```cpp
EventBus::Unsubscribe<PlayerDeathEvent>(token);
```

通常在析构函数中退订：

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

    void playDeathSound() { /* ... */ }
};
```

## 清除事件

```cpp
EventBus::Clear<PlayerDeathEvent>();   // 清空某类事件的监听器
EventBus::ClearAll();                  // 清空所有
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

// 游戏逻辑中发送事件
void Enemy::onDeath() {
    EventBus::Emit(ScoreEvent{100, this});
}
```

## 设计建议

| 适合用事件 | 不适合用事件 |
|---|---|
| 玩家死亡、拾取道具、关卡加载 | 位置更新、旋转、缩放 |
| 音频播放触发 | 渲染、物理 |
| UI 更新通知 | 组件间数据读写 |
| 跨模块通信 | 高频轮询的操作 |

事件是解耦工具，不是万能药。高频操作（每帧的 Transform 同步）用直接调用，低频逻辑（死亡、碰撞、升级）用事件。
