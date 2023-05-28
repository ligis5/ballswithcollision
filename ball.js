function Ball(width, height, id) {
  let sizeAdj = Math.random() * 100;

  let statusCreate = Math.random();

  let r = Math.random() * 250;
  let g = Math.random() * 250;
  let b = Math.random() * 250;

  // so + - would always be in contrast
  let statusR = r > 125 ? 0 : 250;
  let statusG = g > 125 ? 0 : 250;
  let statusB = b > 125 ? 0 : 250;

  this.sizeAdjust = sizeAdj < 60 ? 60 : sizeAdj;
  this.size = (width + height) / this.sizeAdjust;
  this.pos = { x: Math.random() * 500, y: Math.random() * 500 };
  this.color = `rgba(
    ${r}, ${g}, ${b})`;
  this.velocity = { x: 2, y: 2 };
  let randomWind = (Math.random() - 0.5) / 15;
  this.acc = { x: randomWind, y: 0.01 };
  this.status = statusCreate < 0.5 ? 0 : 1;
  this.statusColor = `rgba(
      ${statusR}, ${statusG}, ${statusB})`;
  this.id = id;

  this.move = () => {
    this.velocity.x += this.acc.x;
    this.pos.x += this.velocity.x;
    if (this.pos.x >= width - this.size) {
      this.pos.x = width - this.size;
      this.velocity.x *= -1;
      this.acc.x = 0;
    }
    if (this.pos.x <= 0 + this.size) {
      this.pos.x = 0 + this.size;
      this.velocity.x *= -1;
      this.acc.x = 0;
    }

    this.velocity.y += this.acc.y;
    this.pos.y += this.velocity.y;
    if (this.pos.y >= height - this.size) {
      this.pos.y = height - this.size;
      this.velocity.y *= -1;
      this.acc.y = 0;
    }
    if (this.pos.y <= 0 + this.size) {
      this.pos.y = 0 + this.size;
      this.velocity.y *= -1;
      this.acc.y = 0;
    }
  };
  this.checkCollision = (b) => {
    let minDist = this.size * 2;
    if (this.id != b.id) {
      let v = { x: this.pos.x - b.pos.x, y: this.pos.y - b.pos.y };

      let distance = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));

      if (distance < minDist) {
        let distCorrection = minDist - distance;

        let ang = Math.atan2(v.y, v.x);
        let correctPos = {
          x: distCorrection * Math.cos(ang),
          y: distCorrection * Math.sin(ang),
        };

        this.pos.x += correctPos.x;
        this.pos.y += correctPos.y;
        b.pos.x -= correctPos.x;
        b.pos.y -= correctPos.y;
        this.velocity.x += Math.cos(ang);
        this.velocity.y += Math.sin(ang);
        b.velocity.x -= Math.cos(ang);
        b.velocity.y -= Math.sin(ang);

        let combinedAcc = {
          x: (this.acc.x + b.acc.x) / 2,
          y: (this.acc.y + b.acc.y) / 2,
        };

        this.acc.x = combinedAcc.x;
        this.acc.y = combinedAcc.y;
        b.acc.x = combinedAcc.x;
        b.acc.y = combinedAcc.y;
      }
    }
  };
}
