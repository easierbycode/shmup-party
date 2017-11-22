/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    BOOTSTRAP_COMPLETED: 'state:bootstrap-completed',
    LOADING_COMPLETED: 'state:loading-completed',
    EXAMPLE_COMPLETED: 'state:example-completed'
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    WIDTH: 1280,
    HEIGHT: 768
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// generate common body part names
var commonParts = Phaser.Animation.generateFrameNames('bodypart-common-', 1, 4, '', 4);
// commonParts should contain 2 of each common part
commonParts.concat(commonParts);
var uniqueParts = Phaser.Animation.generateFrameNames('bodypart-unique-', 1, 4, '', 4);
var BODY_PARTS = commonParts.concat(uniqueParts);

var Zombie = exports.Zombie = function (_Phaser$Sprite) {
    _inherits(Zombie, _Phaser$Sprite);

    function Zombie(game) {
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : game.world.randomX;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world.randomY;
        var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'zombie';

        _classCallCheck(this, Zombie);

        var _this = _possibleConstructorReturn(this, (Zombie.__proto__ || Object.getPrototypeOf(Zombie)).call(this, game, x, y, key, 'move-0001'));

        _this.alive = true;
        _this.health = 8;
        _this.speed = 30;


        game.add.existing(_this);
        game.physics.arcade.enable(_this);

        _this.anchor.setTo(0.5, 0.5);

        //  animation
        _this.animations.add('die', Phaser.Animation.generateFrameNames('die-', 1, 64, '', 4), 30, false, false);
        _this.animations.add('walk', Phaser.Animation.generateFrameNames('move-', 1, 64, '', 4), 30, true, false);
        _this.animations.play('walk');

        // body part explosion
        var emitter = game.add.emitter(0, 0, BODY_PARTS.length);
        emitter.makeParticles('zombieBodyParts', BODY_PARTS);
        _this.emitter = emitter;
        return _this;
    }

    _createClass(Zombie, [{
        key: 'damage',
        value: function damage(bullet) {

            var hitPoints = bullet.data.bulletManager.hitPoints || 1;

            this.health -= hitPoints;

            if (this.health <= 0) {
                this.alive = false;
                this.body.moves = false;

                if (bullet.data.bulletManager.BLOWS_SHIT_UP) {
                    this.kill();

                    // explode it's parts away with a random lifespan
                    this.emitter.x = this.body.x;
                    this.emitter.y = this.body.y;
                    this.emitter.start(true, this.game.rnd.between(500, 1250), null, BODY_PARTS.length);
                } else {
                    this.animations.play('die', null, false, true);
                }

                return true;
            }

            return false;
        }
    }, {
        key: 'update',
        value: function update() {
            //  don't update if dead (i.e. while 'die' animation is playing)
            if (!this.alive) return;

            var closestPlayer = this.game.players.getClosestTo(this);

            if (!closestPlayer) return;

            //  rotation
            this.rotation = this.game.physics.arcade.angleBetween(this, closestPlayer);
            //  collision detection
            var zombieTouchingPlayer = this.game.physics.arcade.collide(this.game.players, this, this.game.baddieHitPlayer);

            if (!zombieTouchingPlayer) this.game.physics.arcade.moveToObject(this, closestPlayer, this.speed);
        }
    }]);

    return Zombie;
}(Phaser.Sprite);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Game = undefined;

var _superEventEmitter = __webpack_require__(22);

var _superEventEmitter2 = _interopRequireDefault(_superEventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = exports.Game = function (_Phaser$Game) {
    _inherits(Game, _Phaser$Game);

    function Game() {
        var _ref;

        _classCallCheck(this, Game);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Game.__proto__ || Object.getPrototypeOf(Game)).call.apply(_ref, [this].concat(args)));

        _this.player = null;

        _superEventEmitter2.default.mixin(_this);

        _this.baddieHitPlayer = function (baddie, player) {
            // player.damage( baddie );
        };

        _this.bulletHitBaddie = function (baddie, bullet) {
            bullet.kill();

            var destroyed = baddie.damage(bullet);
        };
        return _this;
    }

    return Game;
}(Phaser.Game);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StateManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stateEvents = __webpack_require__(0);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _bootstrapState = __webpack_require__(19);

var _loadingState = __webpack_require__(21);

var _exampleState = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StateManager = exports.StateManager = function () {
    function StateManager(game) {
        _classCallCheck(this, StateManager);

        this.game = null;

        this.game = game;
        this.setupStates();
        this.setupNativeListeners();
        this.setupListeners();
    }

    _createClass(StateManager, [{
        key: 'setupStates',
        value: function setupStates() {
            this.game.state.add('Bootstrap', _bootstrapState.BootstrapState);
            this.game.state.add('Loading', _loadingState.LoadingState);
            this.game.state.add('Example', _exampleState.ExampleState);
        }
    }, {
        key: 'setupNativeListeners',
        value: function setupNativeListeners() {
            this.game.state.onStateChange.add(function (newState, oldState) {
                console.debug('Enter to new state: %s', newState);
            });
        }
    }, {
        key: 'setupListeners',
        value: function setupListeners() {
            var _this = this;

            this.game.on(_stateEvents2.default.BOOTSTRAP_COMPLETED, function () {
                _this.game.state.start('Loading');
            });

            this.game.on(_stateEvents2.default.LOADING_COMPLETED, function () {
                _this.game.state.start('Example');
            });
        }
    }, {
        key: 'start',
        value: function start() {
            this.game.state.start('Bootstrap');
        }
    }]);

    return StateManager;
}();

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    DEFAULT_X: 96,
    DEFAULT_Y: 32,
    WIDTH: 58
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alien = __webpack_require__(9);

var _zombie = __webpack_require__(2);

exports.default = {

  ALIENS: 44,
  ZOMBIES: 88,

  createBaddies: function createBaddies(game) {
    for (var i = 0; i < this.ALIENS; i++) {
      game.baddies.add(new _alien.Alien(game));
    }

    for (var _i = 0; _i < this.ZOMBIES; _i++) {
      game.baddies.add(new _zombie.Zombie(game));
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// generate common body part names
var commonParts = Phaser.Animation.generateFrameNames('bodypart-common-', 1, 4, '', 4);
// commonParts should contain 2 of each common part
commonParts.concat(commonParts);
var uniqueParts = Phaser.Animation.generateFrameNames('bodypart-unique-', 1, 4, '', 4);
var BODY_PARTS = commonParts.concat(uniqueParts);

var Alien = exports.Alien = function (_Phaser$Sprite) {
    _inherits(Alien, _Phaser$Sprite);

    function Alien(game) {
        var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : game.world.randomX;
        var y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world.randomY;
        var key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'alien';

        _classCallCheck(this, Alien);

        var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, x, y, key, 'move-0001'));

        _this.alive = true;
        _this.health = 10;
        _this.speed = 45;


        game.add.existing(_this);
        game.physics.arcade.enable(_this);

        _this.anchor.setTo(0.5, 0.5);

        //  animation
        _this.animations.add('die', Phaser.Animation.generateFrameNames('die-', 1, 64, '', 4), 30, false, false);
        _this.animations.add('walk', Phaser.Animation.generateFrameNames('move-', 1, 64, '', 4), 30, true, false);
        _this.animations.play('walk');

        // body part explosion
        var emitter = game.add.emitter(0, 0, BODY_PARTS.length);
        emitter.makeParticles('alien', BODY_PARTS);
        _this.emitter = emitter;
        return _this;
    }

    _createClass(Alien, [{
        key: 'damage',
        value: function damage(bullet) {

            var hitPoints = bullet.data.bulletManager.hitPoints || 1;

            this.health -= hitPoints;

            if (this.health <= 0) {
                this.alive = false;
                this.body.moves = false;

                if (bullet.data.bulletManager.BLOWS_SHIT_UP) {
                    this.kill();

                    // explode it's parts away with a random lifespan
                    this.emitter.x = this.body.x;
                    this.emitter.y = this.body.y;
                    this.emitter.start(true, this.game.rnd.between(500, 1250), null, BODY_PARTS.length);
                } else {
                    this.animations.play('die', null, false, true);
                }

                return true;
            }

            return false;
        }
    }, {
        key: 'update',
        value: function update() {
            //  don't update if dead (i.e. while 'die' animation is playing)
            if (!this.alive) return;

            var closestPlayer = this.game.players.getClosestTo(this);

            if (!closestPlayer) return;

            //  rotation
            this.rotation = this.game.physics.arcade.angleBetween(this, closestPlayer);
            //  collision detection
            var alienTouchingPlayer = this.game.physics.arcade.collide(this.game.players, this, this.game.baddieHitPlayer);

            if (!alienTouchingPlayer) this.game.physics.arcade.moveToObject(this, closestPlayer, this.speed);
        }
    }]);

    return Alien;
}(Phaser.Sprite);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//////////////////////////////////////////////////////////////////////////
//  Fires a streaming beam of lazers, very fast, in front of the player //
//////////////////////////////////////////////////////////////////////////

var Beam = exports.Beam = function (_Phaser$Weapon) {
    _inherits(Beam, _Phaser$Weapon);

    function Beam(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Beam';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, Beam);

        var _this = _possibleConstructorReturn(this, (Beam.__proto__ || Object.getPrototypeOf(Beam)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this.hitPoints = 3;


        _this.nextFire = 0;
        _this.bulletSpeed = 1000;
        _this.fireRate = 180;

        _this.createBullets(64, 'bullet11');

        _this.trackSprite(player, 62, 6, true);

        _this.beamFireSound = _this.game.add.audio('beam');

        _this.onFire.add(function (bullet) {
            this.beamFireSound.play();
        }, _this);
        return _this;
    }

    return Beam;
}(Phaser.Weapon);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Bullet) {
    _inherits(Bullet, _Phaser$Bullet);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'kill',
        value: function kill() {}
    }, {
        key: 'update',
        value: function update() {

            if (this.animations.frame < 2) {
                this.animations.frame++;
            } else {
                this.animations.frame = 0;
            }

            _get(Bullet.prototype.__proto__ || Object.getPrototypeOf(Bullet.prototype), 'update', this).call(this);
        }
    }]);

    return Bullet;
}(Phaser.Bullet);

var PacmanBullet = exports.PacmanBullet = function (_Phaser$Weapon) {
    _inherits(PacmanBullet, _Phaser$Weapon);

    function PacmanBullet(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Pacman Bullet';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, PacmanBullet);

        var _this2 = _possibleConstructorReturn(this, (PacmanBullet.__proto__ || Object.getPrototypeOf(PacmanBullet)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this2.BLOWS_SHIT_UP = true;
        _this2.hitPoints = 8;


        _this2.nextFire = 0;
        _this2.bulletSpeed = 600;
        _this2.fireRate = 600;
        _this2.bulletClass = Bullet;

        _this2.createBullets(32, 'pacmanBullet', 0);

        _this2.trackSprite(player, 42, 5, true);
        return _this2;
    }

    return PacmanBullet;
}(Phaser.Weapon);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

///////////////////////////////////////////////////////////////////////
//  Bullets have Gravity.y set on a repeating pre-calculated pattern //
///////////////////////////////////////////////////////////////////////

var Pattern = exports.Pattern = function (_Phaser$Weapon) {
    _inherits(Pattern, _Phaser$Weapon);

    function Pattern(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Pattern';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, Pattern);

        var _this = _possibleConstructorReturn(this, (Pattern.__proto__ || Object.getPrototypeOf(Pattern)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this.nextFire = 0;
        _this.bulletSpeed = 600;
        _this.fireRate = 40;
        _this.bulletAngleVariance = 10;

        _this.createBullets(64, 'bullet4');

        _this.trackSprite(player, 45, 6, true);
        return _this;
    }

    return Pattern;
}(Phaser.Weapon);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Bullet) {
    _inherits(Bullet, _Phaser$Bullet);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'kill',
        value: function kill() {}
    }, {
        key: 'update',
        value: function update() {
            this.angle++;
            this.tint = Math.random() * 0xFFFFFF;
            _get(Bullet.prototype.__proto__ || Object.getPrototypeOf(Bullet.prototype), 'update', this).call(this);
        }
    }]);

    return Bullet;
}(Phaser.Bullet);

/////////////////////////////////////////////////////////////////
//  A single pentagram bullet is fired in front of the trooper //
/////////////////////////////////////////////////////////////////

var PentagramBullet = exports.PentagramBullet = function (_Phaser$Weapon) {
    _inherits(PentagramBullet, _Phaser$Weapon);

    function PentagramBullet(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Pentagram Bullet';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, PentagramBullet);

        var _this2 = _possibleConstructorReturn(this, (PentagramBullet.__proto__ || Object.getPrototypeOf(PentagramBullet)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this2.BLOWS_SHIT_UP = true;
        _this2.hitPoints = 8;


        _this2.nextFire = 0;
        _this2.bulletSpeed = 600;
        _this2.fireRate = 1600;
        _this2.bulletClass = Bullet;

        _this2.createBullets(32, 'pentagramBullet');

        _this2.pentagramBulletFireSound = _this2.game.add.audio('pentagramBulletFire');

        _this2.onFire.add(function () {
            _this2.pentagramBulletFireSound.play();
        }, _this2);

        _this2.trackSprite(player, 60, 5, true);
        return _this2;
    }

    return PentagramBullet;
}(Phaser.Weapon);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _beam = __webpack_require__(10);

var _pacmanBullet = __webpack_require__(11);

var _pentagramBullet = __webpack_require__(13);

var _pattern = __webpack_require__(12);

var _rockets = __webpack_require__(15);

var _scaleBullet = __webpack_require__(16);

var _skullBullet = __webpack_require__(17);

var _splitShot = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(gamepad, game) {
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var key = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'dude';

        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, key));

        _this.currentWeapon = 0;
        _this.weapons = [];


        game.add.existing(_this);
        game.physics.arcade.enable(_this);

        _this.body.collideWorldBounds = true;

        _this.anchor.setTo(0.5, 0.5);

        _this.weapons.push(new _beam.Beam(_this, game));
        _this.weapons.push(new _pacmanBullet.PacmanBullet(_this, game));
        _this.weapons.push(new _pentagramBullet.PentagramBullet(_this, game));
        _this.weapons.push(new _pattern.Pattern(_this, game));
        _this.weapons.push(new _rockets.Rockets(_this, game));
        _this.weapons.push(new _scaleBullet.ScaleBullet(_this, game));
        _this.weapons.push(new _skullBullet.SkullBullet(_this, game));
        _this.weapons.push(new _splitShot.SplitShot(_this, game));

        _this.gamepad = gamepad;

        var changeWeaponButton = _this.gamepad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        changeWeaponButton.onDown.add(_this.nextWeapon, _this);

        var restartButton = _this.gamepad.getButton(Phaser.Gamepad.XBOX360_START);
        // restartButton.onDown.add( this.restart, this );
        return _this;
    }

    _createClass(Player, [{
        key: 'restart',
        value: function restart() {
            location.reload();
        }
    }, {
        key: 'nextWeapon',
        value: function nextWeapon() {
            //  Tidy-up the current weapon
            // var bullets = this.weapons[ this.currentWeapon ].bullets;
            var bullets = this.bullets;
            bullets.visible = false;
            bullets.callAll('reset', null, 0, 0);
            bullets.setAll('exists', false);

            //  Activate the new one
            this.currentWeapon++;

            if (this.currentWeapon === this.weapons.length) {
                this.currentWeapon = 0;
            }

            bullets.visible = true;
        }
    }, {
        key: 'bullets',
        get: function get() {
            return this.weapons[this.currentWeapon].bullets;
        }
    }]);

    return Player;
}(Phaser.Sprite);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Bullet) {
    _inherits(Bullet, _Phaser$Bullet);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'kill',
        value: function kill() {
            var explosionAnimation = this.game.explosions.getFirstExists(false);
            explosionAnimation.reset(this.x, this.y);
            explosionAnimation.play('kaboom', 30, false, true);
            _get(Bullet.prototype.__proto__ || Object.getPrototypeOf(Bullet.prototype), 'kill', this).call(this);
        }
    }]);

    return Bullet;
}(Phaser.Bullet);

///////////////////////////////////////////////////////////////////
//  Rockets that visually track the direction they're heading in //
///////////////////////////////////////////////////////////////////

var Rockets = exports.Rockets = function (_Phaser$Weapon) {
    _inherits(Rockets, _Phaser$Weapon);

    function Rockets(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Rockets';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, Rockets);

        var _this2 = _possibleConstructorReturn(this, (Rockets.__proto__ || Object.getPrototypeOf(Rockets)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this2.BLOWS_SHIT_UP = true;
        _this2.hitPoints = 4;


        _this2.nextFire = 0;
        _this2.bulletSpeed = 400;
        _this2.fireRate = 250;
        _this2.bulletClass = Bullet;

        _this2.createBullets(32, 'bullet10');

        _this2.rocketFireSound = _this2.game.add.audio('rocketFire');

        _this2.onFire.add(function (bullet) {
            this.rocketFireSound.play();
        }, _this2);

        _this2.trackSprite(player, 40, 6, true);
        return _this2;
    }

    return Rockets;
}(Phaser.Weapon);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

////////////////////////////////////////////////////////////////////////
//  A single bullet that scales in size as it moves across the screen //
////////////////////////////////////////////////////////////////////////

var ScaleBullet = exports.ScaleBullet = function (_Phaser$Weapon) {
    _inherits(ScaleBullet, _Phaser$Weapon);

    function ScaleBullet(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Scale Bullet';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, ScaleBullet);

        var _this = _possibleConstructorReturn(this, (ScaleBullet.__proto__ || Object.getPrototypeOf(ScaleBullet)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this.nextFire = 0;
        _this.bulletSpeed = 800;
        _this.fireRate = 100;

        _this.createBullets(32, 'bullet9');

        _this.pulseFireSound = _this.game.add.audio('pulseFire');

        _this.onFire.add(function (bullet) {
            this.pulseFireSound.play();
        }, _this);

        _this.trackSprite(player, 30, 6, true);
        return _this;
    }

    return ScaleBullet;
}(Phaser.Weapon);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = function (_Phaser$Bullet) {
    _inherits(Bullet, _Phaser$Bullet);

    function Bullet() {
        _classCallCheck(this, Bullet);

        return _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).apply(this, arguments));
    }

    _createClass(Bullet, [{
        key: 'kill',
        value: function kill() {}
    }, {
        key: 'update',
        value: function update() {
            this.tint = Math.random() * 0xFFFFFF;
            _get(Bullet.prototype.__proto__ || Object.getPrototypeOf(Bullet.prototype), 'update', this).call(this);
        }
    }]);

    return Bullet;
}(Phaser.Bullet);

/////////////////////////////////////////////////////////////
//  A single skull bullet is fired in front of the trooper //
/////////////////////////////////////////////////////////////

var SkullBullet = exports.SkullBullet = function (_Phaser$Weapon) {
    _inherits(SkullBullet, _Phaser$Weapon);

    function SkullBullet(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Skull Bullet';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, SkullBullet);

        var _this2 = _possibleConstructorReturn(this, (SkullBullet.__proto__ || Object.getPrototypeOf(SkullBullet)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this2.hitPoints = 8;


        _this2.nextFire = 0;
        _this2.bulletSpeed = 600;
        _this2.fireRate = 1600;
        _this2.bulletClass = Bullet;

        _this2.createBullets(32, 'skullBullet');

        _this2.skullBulletFireSound = _this2.game.add.audio('skullBulletFire');

        _this2.onFire.add(function () {
            _this2.skullBulletFireSound.play();
        }, _this2);

        _this2.trackSprite(player, 60, 5, true);
        return _this2;
    }

    return SkullBullet;
}(Phaser.Weapon);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

///////////////////////////////////////////////////////////////////////
//  A three-way fire where the top and bottom bullets bend on a path //
///////////////////////////////////////////////////////////////////////

var SplitShot = exports.SplitShot = function (_Phaser$Weapon) {
    _inherits(SplitShot, _Phaser$Weapon);

    function SplitShot(player, game) {
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : game.world;
        var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Split Shot';
        var addToStage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var enableBody = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
        var physicsBodyType = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : Phaser.Physics.ARCADE;

        _classCallCheck(this, SplitShot);

        var _this = _possibleConstructorReturn(this, (SplitShot.__proto__ || Object.getPrototypeOf(SplitShot)).call(this, game, parent, name, addToStage, enableBody, physicsBodyType));

        _this.nextFire = 0;
        _this.bulletSpeed = 700;
        _this.fireRate = 40;

        _this.createBullets(64, 'bullet8');

        _this.trackSprite(player, 35, 6, true);
        return _this;
    }

    return SplitShot;
}(Phaser.Weapon);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BootstrapState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stateEvents = __webpack_require__(0);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BootstrapState = exports.BootstrapState = function (_Phaser$State) {
    _inherits(BootstrapState, _Phaser$State);

    function BootstrapState() {
        _classCallCheck(this, BootstrapState);

        return _possibleConstructorReturn(this, (BootstrapState.__proto__ || Object.getPrototypeOf(BootstrapState)).apply(this, arguments));
    }

    _createClass(BootstrapState, [{
        key: 'init',
        value: function init() {
            this.stage.backgroundColor = '#6888FF';

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
        }
    }, {
        key: 'preload',
        value: function preload() {
            this.load.image('loader', 'assets/images/loader.png');
            this.load.image('logo', 'assets/images/shmup-party-logo.png');
        }
    }, {
        key: 'create',
        value: function create() {
            this.game.stage.backgroundColor = '#000000';

            this.game.trigger(_stateEvents2.default.BOOTSTRAP_COMPLETED);
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {}
    }]);

    return BootstrapState;
}(Phaser.State);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExampleState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

var _player = __webpack_require__(7);

var _player2 = _interopRequireDefault(_player);

var _stateEvents = __webpack_require__(0);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

var _wave = __webpack_require__(8);

var _wave2 = _interopRequireDefault(_wave);

var _player3 = __webpack_require__(14);

var _zombie = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExampleState = exports.ExampleState = function (_Phaser$State) {
    _inherits(ExampleState, _Phaser$State);

    function ExampleState() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ExampleState);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ExampleState.__proto__ || Object.getPrototypeOf(ExampleState)).call.apply(_ref, [this].concat(args))), _this), _this.bg = null, _this.music = null, _this.gamepad1 = null, _this.gamepad2 = null, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ExampleState, [{
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.physics.startSystem(Phaser.Physics.ARCADE);

            this.bg = this.game.add.tileSprite(0, 0, 2000, 2000, 'earth');
            this.bg.fixedToCamera = true;

            //  explosion pool
            this.game.explosions = new Phaser.Group(this.game);

            for (var i = 0; i < 64; i++) {
                var explosionAnimation = this.game.explosions.create(0, 0, 'kaboom', [0], false);
                explosionAnimation.anchor.setTo(0.5, 0.5);
                explosionAnimation.animations.add('kaboom');
            }

            this.game.baddies = new Phaser.Group(this.game);
            this.game.players = new Phaser.Group(this.game);

            this.music = this.game.add.audio('ledSpirals');
            this.music.play();

            this.game.input.gamepad.start();
            this.gamepad1 = this.game.input.gamepad.pad1;
            this.gamepad2 = this.game.input.gamepad.pad2;

            [this.gamepad1, this.gamepad2].forEach(function (gamepad) {
                gamepad.addCallbacks(gamepad, { onConnect: function onConnect() {
                        var newPlayer = new _player3.Player(gamepad, _this2.game, _player2.default.DEFAULT_X + _player2.default.WIDTH * _this2.index, _player2.default.DEFAULT_Y);
                        _this2.game.players.add(newPlayer);
                    } });
            });

            _wave2.default.createBaddies(this.game);

            this.game.time.events.add(Phaser.Timer.SECOND * 15, function () {
                _wave2.default.createBaddies(_this2.game);
                _this2.game.time.events.add(Phaser.Timer.SECOND * 15, function () {
                    _wave2.default.createBaddies(_this2.game);
                    _this2.game.time.events.add(Phaser.Timer.SECOND * 15, function () {
                        return _wave2.default.createBaddies(_this2.game);
                    });
                });
            });

            this.game.trigger(_stateEvents2.default.EXAMPLE_COMPLETED);
        }
    }, {
        key: 'coordinatesToRadians',
        value: function coordinatesToRadians(x, y) {
            if (x === 0 && y === 0) {
                return null;
            }

            var radians = Math.atan2(y, x);
            if (radians < 0) {
                radians += 2 * Math.PI;
            }
            return Math.abs(radians);
        }
    }, {
        key: 'update',
        value: function update() {
            var _this3 = this;

            var bullets = [];

            this.game.players.forEachAlive(function (player) {
                bullets.push(player.bullets);

                var gamepad = player.gamepad;

                player.body.velocity.x = 0;
                player.body.velocity.y = 0;

                if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
                    player.body.velocity.x = -150;
                } else if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
                    player.body.velocity.x = 150;
                }

                if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
                    player.body.velocity.y = -150;
                } else if (gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
                    player.body.velocity.y = 150;
                }

                var rightStickX = gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
                var rightStickY = gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
                rightStickX = Math.abs(rightStickX) > gamepad.deadZone ? rightStickX : 0;
                rightStickY = Math.abs(rightStickY) > gamepad.deadZone ? rightStickY : 0;
                var thumbstickAngle = _this3.coordinatesToRadians(rightStickX, rightStickY);

                if (thumbstickAngle != null) {
                    player.rotation = thumbstickAngle;

                    player.weapons[player.currentWeapon].fire();
                }
            });

            this.game.baddies.forEachAlive(function (baddie) {
                _this3.game.physics.arcade.overlap(baddie, bullets, _this3.game.bulletHitBaddie);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            // this.game.debug.body(this.game.player);
        }
    }]);

    return ExampleState;
}(Phaser.State);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stateEvents = __webpack_require__(0);

var _stateEvents2 = _interopRequireDefault(_stateEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingState = exports.LoadingState = function (_Phaser$State) {
    _inherits(LoadingState, _Phaser$State);

    function LoadingState() {
        _classCallCheck(this, LoadingState);

        return _possibleConstructorReturn(this, (LoadingState.__proto__ || Object.getPrototypeOf(LoadingState)).apply(this, arguments));
    }

    _createClass(LoadingState, [{
        key: 'preload',
        value: function preload() {
            var logo = this.add.image(this.world.centerX, this.world.centerY, 'logo');
            logo.anchor.set(0.5, 0.5);

            var loader = this.add.image(this.world.centerX, this.world.centerY + 128, 'loader');
            loader.anchor.set(0.5, 0.5);

            this.load.setPreloadSprite(loader);

            this.load.atlasJSONHash('alien', 'assets/images/alien.png', 'assets/images/alien.json');
            this.load.atlasJSONHash('zombie', 'assets/images/zombie.png', 'assets/images/zombie.json');
            this.load.atlasJSONHash('zombieBodyParts', 'assets/images/zombie/body-parts.png', 'assets/images/zombie/body-parts.json');

            this.load.audio('beam', ['assets/sounds/beam.mp3']);
            this.load.audio('ledSpirals', ['assets/sounds/led-spirals.mp3']);
            this.load.audio('pulseFire', ['assets/sounds/pulse-fire.mp3']);
            this.load.audio('rocketFire', ['assets/sounds/rocket-fire.mp3']);
            this.load.audio('pentagramBulletFire', ['assets/sounds/pentagram-bullet-fire.mp3']);
            this.load.audio('skullBulletFire', ['assets/sounds/skull-bullet-fire.mp3']);

            this.load.image('dude', 'assets/images/trooper.png');
            this.load.image('earth', 'assets/images/scorched-earth.png');
            this.load.image('pentagramBullet', 'assets/images/pentagram-bullet.png');
            this.load.image('skullBullet', 'assets/images/skull-bullet.png');
            this.load.image('bullet4', 'assets/images/bullet4.png');

            for (var i = 8; i <= 11; i++) {
                this.load.image('bullet' + i, 'assets/images/bullet' + i + '.png');
            }

            this.load.spritesheet('kaboom', 'assets/images/explosion.png', 64, 64, 23);
            this.load.spritesheet('pacmanBullet', 'assets/images/pacman-spritesheet.png', 32, 32, 3);
        }
    }, {
        key: 'create',
        value: function create() {
            var _this2 = this;

            this.time.events.add(500, function () {
                _this2.game.trigger(_stateEvents2.default.LOADING_COMPLETED);
            });
        }
    }, {
        key: 'update',
        value: function update() {}
    }, {
        key: 'render',
        value: function render() {}
    }]);

    return LoadingState;
}(Phaser.State);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.EventEmitter=t():e.EventEmitter=t()}(this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";e.exports=n(1)},function(e,t,n){/**
	 * @author Piotr Kowalski <piecioshka@gmail.com> (https://piecioshka.pl/)
	 * @name super-event-emitter
	 * @description Super small (2KB) and simple interpretation of popular event management.
	 * @version 4.1.4
	 * @license MIT
	 * @example
	 * var bar = {}; // Or any other object.
	 * EventEmitter.mixin(bar);
	 * bar.on('foo', function () {
	 *     console.log('foo event emitted');
	 * });
	 * bar.emit('foo');
	 */
"use strict";function i(e,t){var n="forEach"in Array.prototype;if(n)e.forEach(t);else for(var i=0;i<e.length;i+=1)t(e[i])}function r(e,t){var n="filter"in Array.prototype;if(n)return e.filter(t);for(var i=[],r=0;r<e.length;r+=1){var o=e[r];t(o)&&i.push(o)}return i}function o(e,t){if(!e)throw new Error(t)}function s(e){return"string"==typeof e}function a(e){return"function"==typeof e}function c(){return this instanceof c?void(this._listeners=[]):new c}var f=n(2),u={on:function(e,t,n){return o(s(e),"EventEmitter#on: name is not a string"),o(a(t),"EventEmitter#on: fn is not a function"),n=n||this,this._listeners.push({name:e,fn:t,ctx:n}),this},once:function(e,t,n){function i(){t.apply(n,arguments),r.off(e,i)}n=n||this;var r=this;return this.on(e,i,n),this},off:function(e,t){return this._listeners=e?r(this._listeners,function(n){return n.name!==e||!!a(t)&&n.fn!==t}):[],this},emit:function(e,t){return o(s(e),"EventEmitter#emit: name is not a string"),i(this._listeners,function(n){n.name===e&&n.fn.call(n.ctx,t);var i=/^all|\*$/.test(n.name);i&&n.fn.call(n.ctx,e,t)}),this}};u.addEventListener=u.addListener=u.bind=u.on,u.removeEventListener=u.removeListener=u.unbind=u.off,u.dispatchEventListener=u.dispatchListener=u.trigger=u.emit,c.prototype=u,c.mixin=function(e){var t=new c;for(var n in t)e[n]=t[n];return e},c.prototype.mixin=c.mixin,c.VERSION=f.version,e.exports=c},function(e,t){e.exports={name:"super-event-emitter",description:"Super small (2KB) and simple interpretation of popular event management.",version:"4.1.4",license:"MIT",author:{name:"Piotr Kowalski",email:"piecioshka@gmail.com",url:"https://piecioshka.pl/"},scripts:{build:"webpack --profile",watch:"webpack -w",test:"jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json",coverage:"istanbul cover jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json",coveralls:"npm run coverage && cat ./coverage/lcov.info | coveralls -v"},repository:{type:"git",url:"http://github.com/piecioshka/super-event-emitter.git"},devDependencies:{coveralls:"^2.11.12",istanbul:"^0.4.4",jasmine:"^2.4.1","json-loader":"^0.5.4","string-replace-loader":"^1.0.3",webpack:"^1.12.14"},files:["dist","lib","index.js","package.json","README.md"],keywords:["super","event","emitter","mixin","on","off","emit","trigger","simple"],main:"./dist/super-event-emitter.min.js"}}])});
//# sourceMappingURL=super-event-emitter.min.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

var _stateManager = __webpack_require__(4);

var _game2 = __webpack_require__(1);

var _game3 = _interopRequireDefault(_game2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game.Game(_game3.default.WIDTH, _game3.default.HEIGHT, 'app', Phaser.CANVAS);
var manager = new _stateManager.StateManager(game);
manager.start();

/***/ })
/******/ ]);