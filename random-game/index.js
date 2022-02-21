const box = document.querySelector('.box');
const canvas = box.querySelector('.canvas');
const goldDisplay = box.querySelector('.gold_count');
const levelDisplay = box.querySelector('.level_count');
const goldBox = box.querySelector('.gold_container');
const levelBox = box.querySelector('.level_container');
const startGame = box.querySelector('.start_game');
const control = box.querySelector('.control');
const pauseMenu = box.querySelector('.game_pause');
const resume = pauseMenu.querySelector('.resume');
const restart = pauseMenu.querySelector('.restart');
const tableButton = pauseMenu.querySelector('.table');
const tableRecord = box.querySelector('.table_record');
const tableClose = tableRecord.querySelector('.close');

const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, radius, color, moveSpeed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.moveSpeed = moveSpeed;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.velocity = velocity;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Gold {
    constructor(x, y, radius, color, duration) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.duration = duration 
        setInterval( () => {
            this.duration--
        }, 1000)
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const projectiles = [];
const enemies = [];
const golds = [];
let animationId;
let player;
let countGold = 0;
let countLevel = 0;
let countkill = 0;
let countEnemy = 0;
let gamePause = false;
let gameOver = false;
let enemyDuration = false;

goldDisplay.textContent = countGold
levelDisplay.textContent = countLevel
















window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

resume.addEventListener('click', () => {
    isPause()
})

restart.addEventListener('click', () => {
    document.location.reload();
})

tableButton.addEventListener('click', () => {
    tableRecord.style.display = 'block';
})

tableClose.addEventListener('click', () => {
    tableRecord.style.display = 'none';
})

startGame.addEventListener('click', () => {
    startGame.style.display = 'none'
    goldBox.style.display = 'inline'
    levelBox.style.display = 'inline'
    control.style.display = 'none'
    spawnPlayer();
    spawnEnemy();
    animation();

    let shotInterval;
    let reload = false;
    
    canvas.addEventListener('mousedown', (event) => {
        let x = event.offsetX;
        let y = event.offsetY;
    
        shotInterval = setInterval( () => {
            if (reload === false && gamePause === false) {
                canvas.addEventListener('mousemove', (event) => {
                    x = event.offsetX
                    y = event.offsetY
                })
    
                spawnProjectile(x, y)
                
                reload = true;
                setTimeout( () => {
                    reload = false;
                }, 500)
            }
        })
    })
    
    document.addEventListener('mouseup', () => {
        clearInterval(shotInterval)
    })
    
    let keyInterval = {};
    let pressedKeys = {};
    
    document.addEventListener ('keydown', (event) => {
        if (!event.repeat && gamePause === false) {
            if (keyInterval[event.code] === undefined) {
                keyInterval[event.code] = setInterval( () => {
                    pressedKeys[event.code] = true;
    
                    let currentMoveSpeed = player.moveSpeed;
                    let keyFilter = Object
                        .values(pressedKeys)
                        .filter( (current) => current);
                    if (keyFilter.length > 1) currentMoveSpeed /= 2 
    
                    Object.keys(pressedKeys).forEach(key => {
                        if (!pressedKeys[key]) return;
                        if (key == 'KeyS' && player.y + player.radius < canvas.height) {
                            player.y += currentMoveSpeed;
                        }
                        if (key == 'KeyD' && player.x + player.radius < canvas.width) {
                            player.x += currentMoveSpeed;
                        }
                        if (key == 'KeyW' && player.y - player.radius > 0) {
                            player.y -= currentMoveSpeed;
                        }
                        if (key == 'KeyA' && player.x - player.radius > 0) {
                            player.x -= currentMoveSpeed;
                        }
                    });
                }, 20)
            }
        }
    })
    
    document.addEventListener('keyup', (event) => {
        for (key in keyInterval) {
            if (key === event.code) {
                pressedKeys[event.code] = false;
                clearInterval(keyInterval[key])
                delete keyInterval[key]
            }
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && !event.repeat && gameOver === false) {
            isPause()
        }
    })
})














function spawnPlayer() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radius = 30;
    const color = 'blue';
    const moveSpeed = 6;
    
    player = new Player(x, y, radius, color, moveSpeed);
}

function spawnProjectile(x, y) {
    const angle = Math.atan2( y - player.y, x - player.x )

    const velocity = {
        x: Math.cos(angle) * 15,
        y: Math.sin(angle) * 15
    }

    projectiles.push(
        new Projectile(
            player.x,
            player.y,
            20,
            'red',
            velocity
        )
    );
}

function spawnEnemy(weight, skin, speed) {
    if (countEnemy <= 10) {
        countEnemy++
        let x = 0;
        let y = 0;
        const radius = weight;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const color = skin;

        const angle = Math.atan2(
            player.y - y,
            player.x - x
        )

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(
            new Enemy(x, y, radius, color, velocity, speed)
        );
    }
}

function spawnGold(xEnemy, yEnemy) {
    const x = xEnemy;
    const y = yEnemy;
    const radius = 20;
    const color = 'yellow';
    const duration = 20;

    golds.push( new Gold(x, y, radius, color, duration) );
}

function animation() {
    animationId = requestAnimationFrame(animation);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (golds.length > 0) {
        golds.forEach( (currentGold, indexGold) => {
            currentGold.draw();
    
            const distance = Math.hypot(
                player.x - currentGold.x,
                player.y - currentGold.y
                );
    
            if (currentGold.duration <= 0) {
                golds.splice(indexGold, 1);
            }
    
            if (distance - player.radius - currentGold.radius < 1) {
                golds.splice(indexGold, 1);
                countGold += 1
                goldDisplay.textContent = countGold
            }
        })
    }
    
    if (projectiles.length > 0) {
        projectiles.forEach( (currentProjectile, indexProjectile) => {
            currentProjectile.update();
    
            if (
                currentProjectile.x + currentProjectile.radius < 0 ||
                currentProjectile.x - currentProjectile.radius > canvas.width ||
                currentProjectile.y + currentProjectile.radius < 0 ||
                currentProjectile.y - currentProjectile.radius > canvas.height
                ) {
                projectiles.splice(indexProjectile, 1);
            }
        })
    }
    
    if (enemies.length > 0) {
        enemies.forEach( (currentEnemy, indexEnemy) => {
            currentEnemy.update();
    
            const angle = Math.atan2(
                player.y - currentEnemy.y,
                player.x - currentEnemy.x
            )
        
            const velocity = {
                x: Math.cos(angle) * currentEnemy.speed,
                y: Math.sin(angle) * currentEnemy.speed
            }
        
            currentEnemy.velocity = velocity;
    
            const distance = Math.hypot(
                player.x - currentEnemy.x,
                player.y - currentEnemy.y
                );
    
            if (distance - currentEnemy.radius - player.radius < 1) {
                setTimeout( () => {
                    gameOver = true
                    resume.style.display = 'none'
                    isPause()
                    console.log('GAME OVER    ' + 'Kills: ' + countkill, '  Golds: ' + countGold)
                }, 0)
                
            }
    
            projectiles.forEach( (currentProjectile, indexProjectile) => {
                const distance = Math.hypot(
                    currentProjectile.x - currentEnemy.x,
                    currentProjectile.y - currentEnemy.y
                    );
    
                if (distance - currentEnemy.radius - currentProjectile.radius < 1) {
                    if (Math.random() < 0.1) {
                        spawnGold(currentEnemy.x, currentEnemy.y)
                    }
                    setTimeout( () => {
                        enemies.splice(indexEnemy, 1);
                        projectiles.splice(indexProjectile, 1);
                        console.log('Kill: ' + (++countkill))
                    }, 0)
                }
            })
        })
    }

    if (enemyDuration === false) {
        setTimeout( () => {
            spawnCommon()
            enemyDuration = false;
        }, 500)
        enemyDuration = true;
    }
    
    player.draw();
}

function isPause () {
    if (gamePause === false) {
        cancelAnimationFrame(animationId);
        pauseMenu.style.display = 'flex'
        gamePause = true;
    } else {
        animation()
        pauseMenu.style.display = 'none'
        gamePause = false;
    }
}

function spawnCommon() {
    spawnEnemy(30, 'green', 1)
}

function spawnFaster() {
    spawnEnemy(20, 'red', 2)
}

function spawnStronger() {
    spawnEnemy(40, 'brown', 0.5)
}

function levelRules() {
    switch (countLevel) {
        case 1:
            spawnCommon(100)
            break
        case 2:
            spawnCommon(80)
            spawnStronger(20)
            break
        case 3:
            spawnCommon(60)
            spawnStronger(20)
            spawnFaster(20)
            break
        case 4:
            spawnCommon(40)
            spawnStronger(30)
            spawnFaster(30)
            break
        case 5:
            spawnCommon(20)
            spawnStronger(40)
            spawnFaster(40)
            break
    }
}

function addInfoRecord(date, kills, gold) {
    const recordElement = document.createElement('div');
    recordElement.classList.add('record');

    const dateElement = document.createElement('span');
    dateElement.textContent = 'Date: ';
    recordElement.append(dateElement);
    
    const dateInfo = document.createElement('span');
    dateInfo.classList.add('info_data');
    dateInfo.textContent = date;
    dateElement.append(dateInfo);

    const killsElement = document.createElement('span');
    killsElement.textContent = 'Kills: ';
    recordElement.append(killsElement);

    const killsInfo = document.createElement('span');
    killsInfo.classList.add('info_kills');
    killsInfo.textContent = kills;
    killsElement.append(killsInfo);

    const goldElement = document.createElement('span');
    goldElement.textContent = 'Gold: ';
    recordElement.append(goldElement);

    const goldInfo = document.createElement('span');
    goldInfo.classList.add('info_gold');
    goldInfo.textContent = gold;
    goldElement.append(goldInfo);

    tableRecord.append(recordElement)
}

addInfoRecord('123', '123', '123')

// function choiceSpawn(sumEnemies) {
//     if (sumEnemies > 1) {
//         let number = Math.floor(Math.random() * sumEnemies + 1);
//         return number;
//     }
// }

// choiceSpawn(2)