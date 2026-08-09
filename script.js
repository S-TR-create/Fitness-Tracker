document.addEventListener('DOMContentLoaded', function () {
  // ---- Bottom nav tab switching ----
  const navButtons = document.querySelectorAll('.navigation-bottom-2 > div');

  navButtons.forEach(function (btn) {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function () {
      // reset all tabs to inactive (gray)
      navButtons.forEach(function (b) {
        const span = b.querySelector('span');
        if (span) {
          span.classList.remove('text-rgb-56-189-248');
          span.classList.add('text-rgb-148-163-184');
        }
      });

      // set the tapped tab to active (blue)
      const activeSpan = btn.querySelector('span');
      if (activeSpan) {
        activeSpan.classList.remove('text-rgb-148-163-184');
        activeSpan.classList.add('text-rgb-56-189-248');
      }

      const label = activeSpan ? activeSpan.textContent.trim() : '';
      if (label && label !== 'Overview') {
        showToast(label + ' page — coming soon!');
      }
    });
  });

  // ---- Camera button ----
  const cameraIcon = document.querySelector('.link-23');
  const avatarImg = document.querySelector('.user-27');

  // hidden file input, created dynamically so no HTML edit is needed for this part
  const cameraInput = document.createElement('input');
  cameraInput.type = 'file';
  cameraInput.accept = 'image/*';
  cameraInput.capture = 'environment';
  cameraInput.style.display = 'none';
  document.body.appendChild(cameraInput);

  if (cameraIcon) {
    cameraIcon.style.cursor = 'pointer';
    cameraIcon.addEventListener('click', function () {
      cameraInput.click();
    });
  }

  cameraInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      if (avatarImg) {
        avatarImg.src = event.target.result;
      }
      showToast('Photo captured! (not saved yet — this resets on refresh)');
    };
    reader.readAsDataURL(file);
  });

  // ---- Simple toast helper ----
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = [
      'position: fixed',
      'bottom: 24px',
      'left: 50%',
      'transform: translateX(-50%)',
      'background: #1e293b',
      'color: #f1f5f9',
      'padding: 12px 20px',
      'border-radius: 8px',
      'font-size: 14px',
      'z-index: 9999',
      'box-shadow: 0 4px 12px rgba(0,0,0,0.3)',
      'max-width: 80vw',
      'text-align: center'
    ].join(';');
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.remove();
    }, 2500);
  }
});
