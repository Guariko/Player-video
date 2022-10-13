const thumbnail = document.querySelector(".thumbnail__container");
const video = document.querySelector(".video");
const playButtonContainer = document.querySelector(".play__button__container");
const bar = document.querySelector(".bar");
const cssVariables = document.querySelector(":root");
const buttonContainer = document.querySelector(".button__container");
const hide = "hide";
const active = "active";

const videoContent = document.querySelector(".video__content");
const barMaxWidth = getComputedStyle(videoContent)["width"].replace("px", "");

video.muted = true;
video.play();

let videoDuration = null;

video.onloadedmetadata = () => {
  videoDuration = video.duration;
};

thumbnail.addEventListener("click", (e) => {
  if (video.muted) {
    video.muted = false;
    addClass(thumbnail, hide);
    video.currentTime = 0;
    if (videoDuration && !video.muted) {
      videoPercentage = video.currentTime / videoDuration;
      cssVariables.style.setProperty("--barAnimation-time", "15s");
      bar.style.width = "99.6%";
    }
  }
});

video.addEventListener("click", (e) => {
  video.pause();
  bar.style.width = getComputedStyle(bar)["width"];
  addClass(playButtonContainer, active);
});

playButtonContainer.addEventListener("click", (e) => {
  removeClass(playButtonContainer, active);
  video.play();
  if (videoDuration && !video.muted) {
    bar.style.width = "99.5%";
  }
});

const showButton = 260;

setInterval(function () {
  barAnimation(
    bar,
    videoDuration,
    video,
    cssVariables,
    barMaxWidth,
    buttonContainer
  );
  if (!videoDuration) {
    location.reload();
  }

  if (
    video.currentTime >= showButton &&
    !buttonContainer.classList.contains(active) &&
    !video.muted
  ) {
    addClass(buttonContainer, active);
  }
}, 100);

/* TODO: Functions start */

function barAnimation(bar, videoDuration, video, cssVariables, barMaxWidth) {
  if (bar.style.width != "100%") {
    let barWidth = getComputedStyle(bar)["width"];
    barWidth = barWidth.replace("px", "");
    videoPercentage = video.currentTime / videoDuration;

    const bar20Percente = barMaxWidth * 0.2;
    const bar20PercenteDurationToBar40Percente = "40s";
    const bar40Percente = barMaxWidth * 0.4;
    const bar40PercenteDurationToBar60Percente = "100s";
    const bar60percente = barMaxWidth * 0.6;
    const bar60PercenteDurationToBar80Percente = "120s";
    const bar80percente = barMaxWidth * 0.8;
    const bar80PercenteDurationToBar95Percente = "140s";
    const bar95percente = barMaxWidth * 0.95;

    let newAnimationTime = bar20PercenteDurationToBar40Percente;

    if (barWidth >= bar20Percente && barWidth < bar40Percente) {
      if (
        getComputedStyle(cssVariables).getPropertyValue(
          "--barAnimation-time"
        ) != bar20PercenteDurationToBar40Percente
      ) {
        cssVariables.style.setProperty("--barAnimation-time", newAnimationTime);
        bar.style.width = "99.9%";
      }
      return;
    }

    if (barWidth >= bar40Percente && barWidth < bar60percente) {
      if (
        getComputedStyle(cssVariables).getPropertyValue(
          "--barAnimation-time"
        ) != bar40PercenteDurationToBar60Percente
      ) {
        newAnimationTime = bar40PercenteDurationToBar60Percente;
        cssVariables.style.setProperty("--barAnimation-time", newAnimationTime);
        bar.style.width = "99.8%";
      }
      return;
    }

    if (barWidth >= bar60percente && barWidth < bar80percente) {
      if (
        getComputedStyle(cssVariables).getPropertyValue(
          "--barAnimation-time"
        ) != bar60PercenteDurationToBar80Percente
      ) {
        newAnimationTime = bar60PercenteDurationToBar80Percente;
        cssVariables.style.setProperty("--barAnimation-time", newAnimationTime);
        bar.style.width = "99.9%";
      }
      return;
    }

    if (barWidth >= bar80percente && barWidth < bar95percente) {
      if (
        getComputedStyle(cssVariables).getPropertyValue(
          "--barAnimation-time"
        ) != bar80PercenteDurationToBar95Percente
      ) {
        newAnimationTime = bar80PercenteDurationToBar95Percente;
        cssVariables.style.setProperty("--barAnimation-time", newAnimationTime);
        bar.style.width = "99.8%";
      }
      return;
    }

    if (barWidth >= bar95percente) {
      let videoEndIn = (
        videoDuration *
        (1 - video.currentTime / videoDuration)
      ).toFixed(2);
      newAnimationTime = videoEndIn.replace(",", ".") + "s";
      cssVariables.style.setProperty("--barAnimation-time", newAnimationTime);
      bar.style.width = "100%";
      return;
    }
  }
}

function addClass(elementToUse, classToAdd) {
  elementToUse.classList.add(classToAdd);
}

function removeClass(elementToUse, classToRemove) {
  elementToUse.classList.remove(classToRemove);
}

/* FIXME: Functions end */
