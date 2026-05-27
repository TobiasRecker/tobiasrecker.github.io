(() => {
  const stackButton = document.querySelector("[data-photo-stack]");

  if (stackButton) {
    stackButton.addEventListener("click", () => {
      const isSwapped = stackButton.classList.toggle("is-swapped");
      stackButton.setAttribute("aria-pressed", String(isSwapped));
    });
  }

  let dialog = document.querySelector("#gallery-lightbox");
  const triggers = Array.from(document.querySelectorAll(".lightbox-trigger"));

  if (triggers.length === 0) {
    return;
  }

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.className = "gallery-lightbox";
    dialog.id = "gallery-lightbox";
    dialog.setAttribute("aria-labelledby", "gallery-lightbox-title");
    dialog.setAttribute("aria-describedby", "gallery-lightbox-description");
    dialog.innerHTML = `
      <div class="gallery-lightbox-inner">
        <button class="gallery-lightbox-close" type="button" aria-label="Close image view" data-gallery-close></button>
        <div class="gallery-lightbox-media">
          <img src="" alt="" data-gallery-lightbox-image>
        </div>
        <div class="gallery-lightbox-copy">
          <div class="meta" data-gallery-lightbox-count></div>
          <h3 id="gallery-lightbox-title" data-gallery-lightbox-title></h3>
          <p id="gallery-lightbox-description" data-gallery-lightbox-description></p>
          <div class="gallery-lightbox-controls">
            <button type="button" aria-label="Previous image" data-gallery-prev></button>
            <button type="button" aria-label="Next image" data-gallery-next></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(dialog);
  }

  const image = dialog.querySelector("[data-gallery-lightbox-image]");
  const title = dialog.querySelector("[data-gallery-lightbox-title]");
  const description = dialog.querySelector("[data-gallery-lightbox-description]");
  const count = dialog.querySelector("[data-gallery-lightbox-count]");
  const closeButton = dialog.querySelector("[data-gallery-close]");
  const previousButton = dialog.querySelector("[data-gallery-prev]");
  const nextButton = dialog.querySelector("[data-gallery-next]");
  let activeIndex = 0;
  let activeTriggers = triggers;
  let lastTrigger = null;

  const showItem = (index) => {
    activeIndex = (index + activeTriggers.length) % activeTriggers.length;
    const item = activeTriggers[activeIndex];
    const thumbnail = item.querySelector("img");

    image.src = item.dataset.gallerySrc;
    image.alt = thumbnail ? thumbnail.alt : "";
    title.textContent = item.dataset.galleryTitle;
    description.textContent = item.dataset.galleryDescription;
    count.textContent = `${activeIndex + 1} / ${activeTriggers.length}`;
  };

  const openDialog = (trigger) => {
    lastTrigger = trigger;
    const group = trigger.dataset.lightboxGroup;
    activeTriggers = group
      ? triggers.filter((item) => item.dataset.lightboxGroup === group)
      : triggers;
    showItem(activeTriggers.indexOf(trigger));

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }

    closeButton.focus();
  };

  const closeDialog = () => {
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openDialog(trigger));
  });

  closeButton.addEventListener("click", closeDialog);
  previousButton.addEventListener("click", () => showItem(activeIndex - 1));
  nextButton.addEventListener("click", () => showItem(activeIndex + 1));

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeDialog();
    }
  });

  dialog.addEventListener("close", () => {
    if (lastTrigger) {
      lastTrigger.focus();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showItem(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showItem(activeIndex + 1);
    }
  });
})();
