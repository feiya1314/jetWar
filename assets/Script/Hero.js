cc.Class({
    extends: cc.Component,

    properties: {
        // defaults, set visually when attaching this script to the Canvas
        bulletSpeed: 0.5,
        bulletFreq: 0.3,
    },

    onLoad: function () {
        this.screenH = this.node.parent.height;
        this.screenW = this.node.parent.width;

        // hero在屏幕最大的位置，防止出屏幕
        this.edgeW = this.screenW / 2 - this.node.width * this.node.scaleX;
        this.edgeH = this.screenH / 2 - this.node.height * this.node.scaleY;
        //cc.log("hero x " + this.edgeW+ " y " + this.edgeH);
        this.initEventListener();

        this.bulletInterval = 1 / this.bulletFreq;
        this.autoFire();
    },

    initEventListener() {
        // 监听触摸事件
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.heroMove, this);
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.heroMove, this);
        this.initKeyboardEvent();
    },

    initKeyboardEvent() {
        this.node.on(cc.SystemEvent.KEY_DOWN, this.onKeyDown, this);
        this.node.on(cc.SystemEvent.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
            case cc.macro.KEY.s:
                console.log('Press a key');
                break;
            case cc.macro.KEY.w:
                console.log('Press a key');
                break;
            case cc.macro.KEY.d:
                console.log('Press a key');
                break;
        }
    },

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                console.log('Press a key');
                break;
            case cc.macro.KEY.s:
                console.log('Press a key');
                break;
            case cc.macro.KEY.w:
                console.log('Press a key');
                break;
            case cc.macro.KEY.d:
                console.log('Press a key');
                break;
        }
    },

    heroMove(touchEvent) { // Event 类型，子类有 EventTouch 、EventMouse等 
        //let location = touchEvent.getLocation();
        this.node.x += touchEvent.getDeltaX(); // 触点距离上一次事件移动的 x 轴距离
        this.node.y += touchEvent.getDeltaY(); // 触点距离上一次事件移动的 y 轴距离

        if (this.node.x > this.edgeW) {
            this.node.x = this.edgeW;
        } else if (this.node.x < -this.edgeW) {
            this.node.x = -this.edgeW;
        }

        if (this.node.y > this.edgeH) {
            this.node.y = this.edgeH;
        } else if (this.node.y < -this.edgeH) {
            this.node.y = -this.edgeH;
        }
    },

    // 定时自动发射子弹
    autoFire() {
        this.schedule(() => {   // 箭头函数this指向是固定不变的，function定义的函数，this的指向随着调用环境的变化而变化的
            this.createBullet();
        }, this.bulletInterval);
    },

    createBullet() {
        let bullet = this.bulletPool.createNode(this.node.parent);
        bullet.hero = this.node;
        bullet.fire();
    },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter(other, self) {
        cc.log("enemy 发生碰撞 ，回收");
        //this.over();
        // todo 血量减少 
        this.damage();
    },

    damage() {
        cc.log("hero damage ");
    },

    // called every frame
    update: function (dt) {
        //cc.systemEvent.on()
    },
});
