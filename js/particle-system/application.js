window.onload = function () {
  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width   = canvas.width  = window.innerWidth,
    height  = canvas.height = window.innerHeight,
    particles = [];

    // creating the particles
    for( var i = 0; i < numParticles; i += 1 ) {
      particles.push(particle.create(width / 2, height / 2, Math.random() * maxSpeed + 2 , Math.random() * Math.PI * 2));

    }

  update();

  function update () {
    context.clearRect(0, 0, width, height);

    for(var i = 0; i < numParticles; i += 1) {
      var p = particles[i];
      p.update();
      context.fillStyle = particleColor;
      context.beginPath();
      context.arc(p.position.getX(), p.position.getY(), particleRadius, 0, Math.PI * 2, false);
      context.fill();

    }

    requestAnimationFrame(update);
  }

}
