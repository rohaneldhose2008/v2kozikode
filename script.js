/* ==========================================================================
   BROWN LIGHTS MEDIA - Interactive JavaScript (Kozhikode Edition)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            mobileToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // 2. Scroll Animations (IntersectionObserver)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // 3. Terms & Conditions Modal Handler (Droid & Google Sans Fonts)
    const termsModal = document.getElementById('terms-modal');
    const termsModalClose = document.getElementById('terms-modal-close');
    const openTermsBtn = document.getElementById('open-terms-btn');

    if (openTermsBtn && termsModal) {
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            termsModal.classList.add('active');
        });
    }

    if (termsModalClose && termsModal) {
        termsModalClose.addEventListener('click', () => {
            termsModal.classList.remove('active');
        });
    }

    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) {
                termsModal.classList.remove('active');
            }
        });
    }

    // 4. Photo Lightbox Modal
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    document.addEventListener('click', (e) => {
        const targetItem = e.target.closest('.gallery-item, .portfolio-item, .masonry-item, .folder-photo-item');
        if (targetItem) {
            const fullSrc = targetItem.getAttribute('data-full');
            if (fullSrc && lightboxModal && lightboxImg) {
                lightboxImg.src = fullSrc;
                lightboxModal.classList.add('active');
            }
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
            }
        });
    }

    // 5. Instagram Square Folder Cards & Folder View Modals
    const folderCards = document.querySelectorAll('.insta-folder-card');
    folderCards.forEach(card => {
        card.addEventListener('click', () => {
            const folderKey = card.getAttribute('data-folder');
            const targetModal = document.getElementById(`folder-modal-${folderKey}`);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    const folderCloseBtns = document.querySelectorAll('.btn-close-folder-view');
    folderCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const folderKey = btn.getAttribute('data-close');
            const targetModal = document.getElementById(`folder-modal-${folderKey}`);
            if (targetModal) {
                targetModal.classList.remove('active');
            }
        });
    });

    const folderViewModals = document.querySelectorAll('.folder-view-modal');
    folderViewModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 6. Video Player Modal
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-modal-iframe');
    const videoClose = document.getElementById('video-modal-close');

    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id') || 'XHOmBV4js_E';
            if (videoModal && videoIframe) {
                videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModal.classList.add('active');
            }
        });
    });

    if (videoClose) {
        videoClose.addEventListener('click', () => {
            if (videoModal && videoIframe) {
                videoModal.classList.remove('active');
                videoIframe.src = '';
            }
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                if (videoIframe) videoIframe.src = '';
            }
        });
    }

    // ==========================================================================
    // 7. EXACT KOZHIKODE DREAM & SIGNATURE PACKAGE BUILDER ENGINE
    // ==========================================================================

    const EVENTS_LIST = [
        'Engagement', 'Betrothal', 'Haldi', 'Mehndi', 'Fixation Ceremony', 
        'Wedding Eve', 'Wedding Day', 'Reception', 'Pre-Wedding', 'Bride-to-be'
    ];

    let dreamState = {
        numDays: 1,
        isCustomDays: false,
        daysConfig: [
            { id: 1, events: [] }
        ],
        retouchedPhotos: 50,
        instagramReels: 2,
        highlightVideo: '3-6 mins',
        albumPages: '40 leaves (80 pages)'
    };

    const dreamModal = document.getElementById('dream-modal');
    const dreamModalClose = document.getElementById('dream-modal-close');
    const openDreamBtns = document.querySelectorAll('.open-dream-modal-btn');
    const openSignatureBtns = document.querySelectorAll('.open-signature-modal-btn');
    const daysContainer = document.getElementById('days-config-container');
    const addDayBtn = document.getElementById('add-day-btn');

    // Render immediately on page load
    renderDreamBuilderUI();

    // Open Signature Package Pre-populated Modal
    openSignatureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (dreamModal) {
                dreamState = {
                    numDays: 2,
                    isCustomDays: false,
                    daysConfig: [
                        {
                            id: 1,
                            events: [
                                { name: 'Wedding Eve', startTime: '16:00', endTime: '21:00', photographers: 1, cinematographers: 1 }
                            ]
                        },
                        {
                            id: 2,
                            events: [
                                { name: 'Wedding Day', startTime: '09:00', endTime: '16:00', photographers: 1, cinematographers: 1 }
                            ]
                        }
                    ],
                    retouchedPhotos: 50,
                    instagramReels: 2,
                    highlightVideo: '3-6 mins',
                    albumPages: '40 leaves (80 pages)'
                };

                const headerTitle = dreamModal.querySelector('.dream-modal-header h2');
                const headerBadge = dreamModal.querySelector('.badge-tag-gold');
                if (headerTitle) headerTitle.textContent = 'Checkout Signature Package';
                if (headerBadge) headerBadge.textContent = 'Signature Package';

                renderDreamBuilderUI();
                dreamModal.classList.add('active');
            }
        });
    });

    // Open Customizable Dream Package Builder Modal
    openDreamBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (dreamModal) {
                dreamState = {
                    numDays: 1,
                    isCustomDays: false,
                    daysConfig: [
                        { id: 1, events: [] }
                    ],
                    retouchedPhotos: 50,
                    instagramReels: 2,
                    highlightVideo: '3-6 mins',
                    albumPages: '40 leaves (80 pages)'
                };

                const headerTitle = dreamModal.querySelector('.dream-modal-header h2');
                const headerBadge = dreamModal.querySelector('.badge-tag-gold');
                if (headerTitle) headerTitle.textContent = 'Dream Package';
                if (headerBadge) headerBadge.textContent = 'Fully Custom';

                renderDreamBuilderUI();
                dreamModal.classList.add('active');
            }
        });
    });

    if (dreamModalClose) {
        dreamModalClose.addEventListener('click', () => {
            dreamModal.classList.remove('active');
        });
    }

    if (dreamModal) {
        dreamModal.addEventListener('click', (e) => {
            if (e.target === dreamModal) {
                dreamModal.classList.remove('active');
            }
        });
    }

    function updateNumDays(newNum, isCustom = false) {
        dreamState.numDays = newNum;
        dreamState.isCustomDays = isCustom;

        let newConfig = [...dreamState.daysConfig];
        if (newNum > newConfig.length) {
            for (let i = newConfig.length + 1; i <= newNum; i++) {
                newConfig.push({ id: i, events: [] });
            }
        } else {
            newConfig.length = newNum;
        }
        dreamState.daysConfig = newConfig;
        renderDreamBuilderUI();
    }

    function renderDreamBuilderUI() {
        document.querySelectorAll('.btn-day-pill').forEach(btn => {
            const opt = btn.getAttribute('data-days');
            if (opt === 'more' && dreamState.isCustomDays) {
                btn.classList.add('active');
            } else if (!dreamState.isCustomDays && parseInt(opt) === dreamState.numDays) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (addDayBtn) {
            addDayBtn.style.display = dreamState.isCustomDays ? 'block' : 'none';
        }

        if (!daysContainer) return;
        daysContainer.innerHTML = '';

        dreamState.daysConfig.forEach((day, dIdx) => {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-config-card';

            let eventPillsHTML = EVENTS_LIST.map(eventName => {
                const isSelected = day.events.some(e => e.name === eventName);
                return `
                    <button type="button" class="btn-event-pill ${isSelected ? 'active' : ''}" data-day="${dIdx}" data-event="${eventName}">
                        ${eventName} ${isSelected ? '<i class="fa-solid fa-check"></i>' : ''}
                    </button>
                `;
            }).join('');

            let configuredEventsHTML = '';
            if (day.events.length > 0) {
                configuredEventsHTML = day.events.map((ev, evIdx) => `
                    <div class="event-subcard">
                        <h5><i class="fa-regular fa-clock"></i> ${ev.name}</h5>
                        <div class="time-row">
                            <div>
                                <label style="font-size: 0.75rem; color: #666; display: block; margin-bottom: 4px;">Start Time</label>
                                <input type="time" class="event-time-start" data-day="${dIdx}" data-evidx="${evIdx}" value="${ev.startTime || '09:00'}">
                            </div>
                            <div>
                                <label style="font-size: 0.75rem; color: #666; display: block; margin-bottom: 4px;">End Time</label>
                                <input type="time" class="event-time-end" data-day="${dIdx}" data-evidx="${evIdx}" value="${ev.endTime || '13:00'}">
                            </div>
                        </div>
                        <div class="crew-grid-inline">
                            <div class="crew-box-item">
                                <span>Photographers</span>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <button type="button" class="counter-btn-mini photo-dec" data-day="${dIdx}" data-evidx="${evIdx}">-</button>
                                    <span style="font-weight:600; width:16px; text-align:center;">${ev.photographers}</span>
                                    <button type="button" class="counter-btn-mini photo-inc" data-day="${dIdx}" data-evidx="${evIdx}">+</button>
                                </div>
                            </div>
                            <div class="crew-box-item">
                                <span>Cinematographers</span>
                                <div style="display:flex; align-items:center; gap:6px;">
                                    <button type="button" class="counter-btn-mini cinema-dec" data-day="${dIdx}" data-evidx="${evIdx}">-</button>
                                    <span style="font-weight:600; width:16px; text-align:center;">${ev.cinematographers}</span>
                                    <button type="button" class="counter-btn-mini cinema-inc" data-day="${dIdx}" data-evidx="${evIdx}">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            dayCard.innerHTML = `
                <h4>Day ${day.id} Program</h4>
                <p style="font-size:0.85rem; color:#666; margin-bottom:0.75rem;">Select events for Day ${day.id}:</p>
                <div class="event-pills-wrap">
                    ${eventPillsHTML}
                </div>
                ${configuredEventsHTML}
            `;

            daysContainer.appendChild(dayCard);
        });

        attachDreamEventListeners();
    }

    function attachDreamEventListeners() {
        document.querySelectorAll('.btn-event-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = parseInt(btn.getAttribute('data-day'));
                const eventName = btn.getAttribute('data-event');

                const events = dreamState.daysConfig[dIdx].events;
                const existingIdx = events.findIndex(e => e.name === eventName);

                if (existingIdx > -1) {
                    events.splice(existingIdx, 1);
                } else {
                    events.push({
                        name: eventName,
                        startTime: '09:00',
                        endTime: '13:00',
                        photographers: 1,
                        cinematographers: 1
                    });
                }
                renderDreamBuilderUI();
            });
        });

        document.querySelectorAll('.event-time-start').forEach(input => {
            input.addEventListener('change', (e) => {
                const dIdx = parseInt(input.getAttribute('data-day'));
                const evIdx = parseInt(input.getAttribute('data-evidx'));
                dreamState.daysConfig[dIdx].events[evIdx].startTime = e.target.value;
            });
        });

        document.querySelectorAll('.event-time-end').forEach(input => {
            input.addEventListener('change', (e) => {
                const dIdx = parseInt(input.getAttribute('data-day'));
                const evIdx = parseInt(input.getAttribute('data-evidx'));
                dreamState.daysConfig[dIdx].events[evIdx].endTime = e.target.value;
            });
        });

        document.querySelectorAll('.photo-dec').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = parseInt(btn.getAttribute('data-day'));
                const evIdx = parseInt(btn.getAttribute('data-evidx'));
                const ev = dreamState.daysConfig[dIdx].events[evIdx];
                if (ev.photographers > 0) ev.photographers--;
                renderDreamBuilderUI();
            });
        });

        document.querySelectorAll('.photo-inc').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = parseInt(btn.getAttribute('data-day'));
                const evIdx = parseInt(btn.getAttribute('data-evidx'));
                dreamState.daysConfig[dIdx].events[evIdx].photographers++;
                renderDreamBuilderUI();
            });
        });

        document.querySelectorAll('.cinema-dec').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = parseInt(btn.getAttribute('data-day'));
                const evIdx = parseInt(btn.getAttribute('data-evidx'));
                const ev = dreamState.daysConfig[dIdx].events[evIdx];
                if (ev.cinematographers > 0) ev.cinematographers--;
                renderDreamBuilderUI();
            });
        });

        document.querySelectorAll('.cinema-inc').forEach(btn => {
            btn.addEventListener('click', () => {
                const dIdx = parseInt(btn.getAttribute('data-day'));
                const evIdx = parseInt(btn.getAttribute('data-evidx'));
                dreamState.daysConfig[dIdx].events[evIdx].cinematographers++;
                renderDreamBuilderUI();
            });
        });
    }

    document.querySelectorAll('.btn-day-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            const opt = btn.getAttribute('data-days');
            if (opt === 'more') {
                if (dreamState.daysConfig.length < 5) {
                    updateNumDays(5, true);
                } else {
                    updateNumDays(dreamState.daysConfig.length, true);
                }
            } else {
                updateNumDays(parseInt(opt), false);
            }
        });
    });

    if (addDayBtn) {
        addDayBtn.addEventListener('click', () => {
            updateNumDays(dreamState.numDays + 1, true);
        });
    }

    document.querySelectorAll('.photos-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.photos-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dreamState.retouchedPhotos = parseInt(btn.getAttribute('data-val'));
        });
    });

    document.getElementById('reels-dec')?.addEventListener('click', () => {
        if (dreamState.instagramReels > 1) {
            dreamState.instagramReels--;
            document.getElementById('reels-count').textContent = dreamState.instagramReels;
        }
    });

    document.getElementById('reels-inc')?.addEventListener('click', () => {
        dreamState.instagramReels++;
        document.getElementById('reels-count').textContent = dreamState.instagramReels;
    });

    document.querySelectorAll('.highlight-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.highlight-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dreamState.highlightVideo = btn.getAttribute('data-val');
        });
    });

    document.querySelectorAll('.album-opt').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.album-opt').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dreamState.albumPages = btn.getAttribute('data-val');
        });
    });

    const dreamForm = document.getElementById('dream-builder-form');
    if (dreamForm) {
        dreamForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let scheduleText = dreamState.daysConfig.map(day => {
                if (day.events.length === 0) return `*Day ${day.id}*: No events selected`;
                const eventsList = day.events.map(ev => 
                    `  • ${ev.name} (${ev.startTime || '09:00'} - ${ev.endTime || '13:00'})\n    Crew: ${ev.photographers} Photographers, ${ev.cinematographers} Cinematographers`
                ).join('\n');
                return `*Day ${day.id} Program*\n${eventsList}`;
            }).join('\n\n');

            let payload = `Hello Brown Lights Media! I have customized my Package:\n\n` +
                `📅 *Program Schedule & Crew:*\n${scheduleText}\n\n` +
                `📷 *Custom Output Deliverables:*\n` +
                `- Edited Photos: ${dreamState.retouchedPhotos} pics\n` +
                `- Instagram Reels: ${dreamState.instagramReels}x\n` +
                `- Highlight Video: ${dreamState.highlightVideo}\n` +
                `- Album: ${dreamState.albumPages}`;

            const encoded = encodeURIComponent(payload);
            window.open(`https://wa.me/919746558773?text=${encoded}`, '_blank');
            dreamModal.classList.remove('active');
        });
    }

    // 8. Contact Form Submission
    const contactForm = document.getElementById('wedding-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('first-name').value;
            alert(`Thank you, ${firstName}! Your message has been sent to Brown Lights Media Kozhikode.`);
            contactForm.reset();
        });
    }

});
