// ==UserScript==
// @name         Threads-Volume
// @namespace    threadsVolume
// @version      1.0.0
// @description  Set your Threads videos default volumes
// @author       Lin_tsen
// @match        *://*.threads.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=threads.net
// @grant        none
// @license      MIT
// ==/UserScript==

console.log("threadsVolumeCustomize")

window.addEventListener('load', () => {
    if (!localStorage.getItem('defaultVolume')) {
        localStorage.setItem('defaultVolume', 0.2);
    }

    const findVolumeDiv = () => {
        const targetElement = document.querySelector('header') || document.body;
        if (!targetElement) return;

        const volumeDiv = document.createElement('div');
        volumeDiv.id = 'volumeDiv';
        volumeDiv.style.display = 'flex';
        volumeDiv.style.padding = '10px';
        volumeDiv.style.borderRadius = '8px';
        volumeDiv.style.cursor = 'pointer';
        volumeDiv.style.maxHeight = '3vh';
        volumeDiv.style.position = 'fixed';
        volumeDiv.style.top = '10px';
        volumeDiv.style.right = '10px';
        volumeDiv.style.zIndex = '9999';
        volumeDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';

        volumeDiv.addEventListener('mouseenter', () => {
            volumeDiv.style.backgroundColor = '#1A1A1A';
            volumeText.style.color = 'white'
        });

        volumeDiv.addEventListener('mouseleave', () => {
            volumeDiv.style.backgroundColor = 'rgba(0,0,0,0.5)';
            volumeText.style.color = ''
        });

        const volumeBtn = document.createElement('button');
        volumeBtn.id = 'volumeBtn';
        volumeBtn.style.display = 'flex';
        volumeBtn.style.textAlign = 'left';
        volumeBtn.style.cursor = 'pointer';

        const volumeTextContainer = document.createElement('div');
        volumeTextContainer.style.overflow = 'hidden';

        const volumeText = document.createElement('span');
        volumeText.id = 'volumeText';
        volumeText.style.paddingLeft = '10px';
        volumeText.textContent = 'Volume';

        const volumeSelectorInput = document.createElement('input');
        volumeSelectorInput.type = 'range';
        volumeSelectorInput.value = localStorage.getItem('defaultVolume') * 100 || 20;
        volumeSelectorInput.min = 0;
        volumeSelectorInput.max = 99.9;
        volumeSelectorInput.style.display = 'none';
        volumeSelectorInput.style.cursor = 'ew-resize';

        const volumeSelectorText = document.createElement('span');
        volumeSelectorText.textContent = volumeSelectorInput.value;

        volumeSelectorInput.addEventListener('input', () => {
            let volumeValue = volumeSelectorInput.value;
            if (volumeValue < 10) {
                volumeValue = '0' + volumeValue;
            }
            volumeSelectorText.textContent = volumeValue;
            localStorage.setItem('defaultVolume', volumeValue / 100);
        });

        volumeDiv.appendChild(volumeBtn);
        volumeDiv.appendChild(volumeTextContainer);
        volumeTextContainer.appendChild(volumeText);
        volumeBtn.appendChild(volumeSelectorText);
        volumeBtn.appendChild(volumeSelectorInput);

        let showVolumeText = true;
        volumeDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            showVolumeText = !showVolumeText;
            volumeSelectorInput.style.display = showVolumeText ? 'none' : 'block';
            volumeText.style.display = showVolumeText ? 'block' : 'none';
        });

        targetElement.appendChild(volumeDiv);
    };

    setInterval(() => {
        if (!document.getElementById('volumeDiv')) {
            findVolumeDiv();
        }
    }, 1000);

    const setVolumeForVideos = () => {
        const defaultVolume = parseFloat(localStorage.getItem('defaultVolume'));
        const videos = document.getElementsByTagName('video');
        for (let i = 0; i < videos.length; i++) {
            videos[i].volume = defaultVolume;
        }
    };

    setVolumeForVideos();

    new MutationObserver(() => {
        setVolumeForVideos();
    }).observe(document.body, { childList: true, subtree: true });

});


// / \----------------, 
// \_,|               | 
//     |    Lin_tsen   | 
//     |  ,--------------
//     \_/_____________/ 
