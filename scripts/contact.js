const mousFollower = e => {
    const cursor = document.querySelector(`#cursor`);
    let start = new Date().getTime();
  
  const originPosition = { x: 0, y: 0 };
  
  const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition
  }
  
  // ! configuration of styling
  
  const config = {
    starAnimationDuration: 1500,
    minimumTimeBetweenStars: 250,
    minimumDistanceBetweenStars: 75,
    glowDuration: 75,
    zIndex: 50,
    maximumGlowPointSpacing: 10,
    colors: ["249 146 253", "252 254 255"],
    sizes: ["1.2rem", ".8rem", "0.4rem"],
    animations: ["fall-1", "fall-2", "fall-3"]
  }
  
  let count = 0;
  
  // ! function of star
    
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
        selectRandom = items => items[rand(0, items.length - 1)];
  
  const withUnit = (value, unit) => `${value}${unit}`,
        px = value => withUnit(value, "px"),
        ms = value => withUnit(value, "ms");
  
  const calcDistance = (a, b) => {
    const diffX = b.x - a.x,
          diffY = b.y - a.y;
    
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }
  
  const calcElapsedTime = (start, end) => end - start;
  
  const appendElement = element => document.body.appendChild(element),
        removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);
  
  
  // ! creating star element style
  
  const createStar = position => {
    const star = document.createElement("span"),
          color = selectRandom(config.colors);
    
    star.className = "star fa-solid fa-star";
    
    star.style.left = px(position.x);
    star.style.top = px(position.y);
    star.style.zIndex = config
    star.style.fontSize = selectRandom(config.sizes);
    star.style.color = `rgb(${color})`;
    star.style.zIndex = config.zIndex;
    star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
    star.style.animationName = config.animations[count++ % 3];
    star.style.starAnimationDuration = ms(config.starAnimationDuration);
    
    appendElement(star);
  
    removeElement(star, config.starAnimationDuration);
  }
  
  
  // ! styling for glow effect
  
  const createGlowPoint = position => {
    const glow = document.createElement("div");
    
    glow.className = "glow-point";
    
    glow.style.left = px(position.x);
    glow.style.top = px(position.y);
    glow.style.zIndex = config.zIndex;
    glow.style.transform = `translate(50%, 50%)`;
    
    appendElement(glow)
    
    removeElement(glow, config.glowDuration);
  }
  
  const determinePointQuantity = distance => Math.max(
    Math.floor(distance / config.maximumGlowPointSpacing),
    1
  );
  
  
  //! create a glow effect
  
  const createGlow = (last, current) => {
    const distance = calcDistance(last, current),
          quantity = determinePointQuantity(distance);
    
    const dx = (current.x - last.x) / quantity,
          dy = (current.y - last.y) / quantity;
    
    Array.from(Array(quantity)).forEach((_, index) => { 
      const x = last.x + dx * index, 
            y = last.y + dy * index;
      
      createGlowPoint({ x, y });
    });
  }
  
  const updateLastStar = position => {
    last.starTimestamp = new Date().getTime();
  
    last.starPosition = position;
  }
  
  const updateLastMousePosition = position => last.mousePosition = position;
  
  const adjustLastMousePosition = position => {
    if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
      last.mousePosition = position;
    }
  };
  
  const handleOnMove = e => {
    const mousePosition = { x: e.clientX, y: e.clientY }
  
    //   gsap.to(cursor, {
    //   left: mousePosition.x + "px",
    //   top: mousePosition.y + "px",
    // });
  
    cursor.style.left = mousePosition.x + "px";
    cursor.style.top = mousePosition.y + "px";
    
    adjustLastMousePosition(mousePosition);
    
    const now = new Date().getTime(),
          hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
          hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
    
    if(hasMovedFarEnough || hasBeenLongEnough) {
      createStar(mousePosition);
      
      updateLastStar(mousePosition);
    }
    
    createGlow(last.mousePosition, mousePosition);
    
    updateLastMousePosition(mousePosition);
  }
  
  document.onmousemove = e => handleOnMove(e);
  
  window.ontouchmove = e => handleOnMove(e.touches[0]);
  
  document.body.onmouseleave = () => updateLastMousePosition(originPosition);


  
  }
  mousFollower();
  
  
  
  let index = 0,
      interval = 1000;
  
  const rand = (min, max) => 
    Math.floor(Math.random() * (max - min + 1)) + min;
  
  const animate = star => {
    star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
    star.style.setProperty("--star-top", `${rand(-40, 80)}%`);
  
    star.style.animation = "none";
    star.offsetHeight;
    star.style.animation = "";
  }
  
  for(const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      animate(star);
      
      setInterval(() => animate(star), 1000);
    }, index++ * (interval / 3))
  }



  document.getElementById('contactForm').addEventListener('submit', function(event) {
    // event.preventDefault(); // Prevent the form from submitting in the traditional way

    // Get the input and textarea values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create the mailto link with the gathered data
    const recipient = "sohelhussaing@gmail.com";
    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;

    // Open the user's email client with the filled-in details
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});