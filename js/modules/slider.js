function slider() {
  //************************************//
  //               Slider               //
  //************************************//

  //Version2
  /*let slideIndex = 1;
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current");

  showSlides(slideIndex);

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
  } else {
    total.textContent = slides.length;
  }

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => (item.style.display = "none"));

    slides[slideIndex - 1].style.display = "block"; // Как ваша самостоятельная работа - переписать на использование классов show/hide

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  prev.addEventListener("click", function () {
    plusSlides(-1);
  });

  next.addEventListener("click", function () {
    plusSlides(1);
  });*/

  //version1
  /*const prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    current = document.querySelector("#current"),
    slides = document.querySelectorAll(".offer__slide");

  let currentIndex = 0,
    totalAmount = 4;

  function addZeroBeforeNumber(currentIndex) {
    let flag = false;
    if (Math.floor(currentIndex / 10) == 0) flag = true;

    return flag;
  }

  function insertNumerationOfSlide(current, currentIndex) {
    if (addZeroBeforeNumber(currentIndex))
      current.textContent = `${"0" + (currentIndex + 1)}`;
    else current.textContent = `${currentIndex + 1}`;
  }

  function start(slides, currentIndex, current) {
    slides[0].classList.add("show");
    insertNumerationOfSlide(current, currentIndex);
    for (let i = 1; i < slides.length; i++) {
      slides[i].classList.add("hide");
      // slides[i].classList.add("fade");
    }
  }

  function hide(slides, currentIndex) {
    for (let i = 0; i < slides.length; i++) {
      if (i == currentIndex) slides[i].classList.add("hide");
    }
  }

  function show(slides, currentIndex, current) {
    for (let i = 0; i < slides.length; i++) {
      if (i == currentIndex) {
        slides[i].classList.remove("hide");
        slides[i].classList.add("show");

        insertNumerationOfSlide(current, currentIndex);
      }
    }
  }

  function sliderManipulation(
    prev,
    next,
    current,
    total,
    slides,
    currentIndex,
    totalAmount
  ) {
    start(slides, currentIndex, current);

    next.addEventListener("click", () => {
      hide(slides, currentIndex);
      if (currentIndex != totalAmount - 1) currentIndex++;
      else currentIndex = 0;

      show(slides, currentIndex, current);
    });

    prev.addEventListener("click", () => {
      hide(slides, currentIndex);
      if (currentIndex != 0) currentIndex--;
      else currentIndex = totalAmount - 1;

      show(slides, currentIndex, current);
    });
  }

  sliderManipulation(
    prev,
    next,
    current,
    total,
    slides,
    currentIndex,
    totalAmount
  );*/

  //version3 carousel

  let offset = 0;
  let slideIndex = 1;

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector(".offer__slider-inner");

  function setZeroOrNot() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function setInitOpacityDots() {
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  }

  function convertWidthToNumberWithoutPX(width) {
    return +width.replace(/\D/g, "");
  }

  setZeroOrNot();

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  next.addEventListener("click", () => {
    if (offset == convertWidthToNumberWithoutPX(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += convertWidthToNumberWithoutPX(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    setZeroOrNot();

    setInitOpacityDots();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = convertWidthToNumberWithoutPX(width) * (slides.length - 1);
    } else {
      offset -= convertWidthToNumberWithoutPX(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    setZeroOrNot();

    setInitOpacityDots();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = convertWidthToNumberWithoutPX(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      setZeroOrNot();

      setInitOpacityDots();
    });
  });
}

module.exports = slider;
