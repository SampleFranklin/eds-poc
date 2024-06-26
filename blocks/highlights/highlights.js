import utility from '../../utility/utility.js';
import ctaUtils from '../../utility/ctaUtils.js';

export default function decorate(block) {
    function initImage(image, altTextEl) {
      const img = image.querySelector('img');
      img.removeAttribute('width');
      img.removeAttribute('height');
      const alt = altTextEl?.textContent?.trim() || 'image';
      img.setAttribute('alt', alt);
    }

    const cards = [...block.children].map(child => {
        const [
              backgroundImageEl,
              backgroundAltTextEl,
              foregroundImageEl,
              foregroundAltTextEl,
              pretitleEl,
              titleEl,
              descriptionEl,
              ctaLinkEl,
              ctaTargetEl,
            ] = child.children;

        const backgroundImage = backgroundImageEl?.querySelector('picture');
        if (backgroundImage) {
          initImage(backgroundImage, backgroundAltTextEl);
        }

        const foregroundImage = foregroundImageEl?.querySelector('picture');
        if (foregroundImage) {
          initImage(foregroundImage, foregroundAltTextEl);
        }

        const pretitle = pretitleEl?.textContent?.trim();
        const title = titleEl?.textContent?.trim();
        const description = Array.from(descriptionEl.querySelectorAll('p')).map((p) => p.outerHTML).join('');

        const primaryCta = ctaUtils.getLink(ctaLinkEl, '', ctaTargetEl, 'primary__btn');
        let ctaHtml = '';
        if (primaryCta) {
          ctaHtml = `
                 <div class="highlight__actions">
                   ${(primaryCta) ? primaryCta.outerHTML : ''}
                 </div>
               `;
        }

        child.innerHTML = '';
        child.insertAdjacentHTML(
          'beforeend',
          utility.sanitizeHtml(`
                               ${(backgroundImage) ? `<div class="highlight__backgroundImage">${backgroundImage.outerHTML}</div>` : ''}
                               ${(foregroundImage) ? `<div class="highlight__foregroundImage">${foregroundImage.outerHTML}</div>` : ''}
                               <div class="highlight__content">
                                   <div class="highlight__info">
                                       ${(pretitle) ? `<div class="highlight__pretitle"><p>${pretitle}</p></div>` : ''}
                                       ${(title) ? `<div class="highlight__title"><h3>${title}</h3></div>` : ''}
                                       ${(description) ? `<div class="highlight__description">${description}</div>` : ''}
                                   </div>
                                   ${ctaHtml}
                               </div>
                     `),
        );
        child.classList.add('highlight__card');
        return child.outerHTML;
    }).join('');
    block.innerHTML = '';
    block.insertAdjacentHTML('beforeend',utility.sanitizeHtml(cards));
}