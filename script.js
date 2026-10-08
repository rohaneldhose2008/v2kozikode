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
    const signatureModal = document.getElementById('signature-modal');
    const signatureModalClose = document.getElementById('signature-modal-close');
    const submitSignatureBtn = document.getElementById('submit-signature-checkout-btn');
    const openDreamBtns = document.querySelectorAll('.open-dream-modal-btn');
    const openSignatureBtns = document.querySelectorAll('.open-signature-modal-btn');
    const daysContainer = document.getElementById('days-config-container');
    const addDayBtn = document.getElementById('add-day-btn');

    // Render immediately on page load
    renderDreamBuilderUI();

    // Open Dedicated Signature Package Modal
    openSignatureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (signatureModal) {
                signatureModal.classList.add('active');
            }
        });
    });

    if (signatureModalClose && signatureModal) {
        signatureModalClose.addEventListener('click', () => {
            signatureModal.classList.remove('active');
        });
    }

    if (signatureModal) {
        signatureModal.addEventListener('click', (e) => {
            if (e.target === signatureModal) {
                signatureModal.classList.remove('active');
            }
        });
    }

    // Submit Signature Package Checkout to WhatsApp
    if (submitSignatureBtn) {
        submitSignatureBtn.addEventListener('click', () => {
            const customNotes = document.getElementById('signature-custom-notes')?.value.trim() || 'None';

            let payload = `Hello Brown Lights Media! I want to checkout the Signature Package:\n\n` +
                `📌 *Package Coverage:* FOR BOTH SIDES (BRIDE & GROOM)\n\n` +
                `👥 *The Crew:* \n` +
                `  • Wedding Eve: 1 Lead Candid Photographer, 1 Lead Candid Cinematographer\n` +
                `  • Wedding Day: 1 Lead Candid Photographer, 1 Lead Candid Cinematographer\n\n` +
                `📷 *Deliverables:*\n` +
                `  • Edited photos (up to 50 pics)\n` +
                `  • Soft Copies (USB & Google Drive)\n` +
                `  • Instagram film video x 2\n` +
                `  • Wedding highlight video (3-6 minutes)\n` +
                `  • Album 40 leaves (80 pages)\n` +
                `  • + Complimentary: Mini album, Signature online album, Table calendar, Photo frame\n\n` +
                `📝 *Custom Requests / Notes / Questions:*\n${customNotes}`;

            const encoded = encodeURIComponent(payload);
            window.open(`https://wa.me/919746558773?text=${encoded}`, '_blank');
            if (signatureModal) signatureModal.classList.remove('active');
        });
    }

    // Open Start Your Planning / Client Details Modal
    openDreamBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (dreamModal) {
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

    const planningForm = document.getElementById('planning-details-form');
    if (planningForm) {
        planningForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientName = document.getElementById('plan-client-name')?.value.trim() || 'N/A';
            const whatsapp = document.getElementById('plan-whatsapp')?.value.trim() || 'N/A';
            const weddingDate = document.getElementById('plan-wedding-date')?.value || 'N/A';
            const coverage = planningForm.querySelector('input[name="wedding_coverage"]:checked')?.value || 'N/A';
            const venue = document.getElementById('plan-venue')?.value.trim() || 'Not specified';
            const guestCount = planningForm.querySelector('input[name="guest_count"]:checked')?.value || 'N/A';
            const extraPhotographer = planningForm.querySelector('input[name="extra_photographer"]:checked')?.value || 'N/A';
            const services = planningForm.querySelector('input[name="services_wanted"]:checked')?.value || 'N/A';
            
            const outputsChecked = Array.from(planningForm.querySelectorAll('input[name="outputs_wanted"]:checked')).map(cb => cb.value);
            const outputs = outputsChecked.length > 0 ? outputsChecked.join(', ') : 'None selected';
            
            const budget = planningForm.querySelector('input[name="budget_range"]:checked')?.value || 'N/A';

            let payload = `Hello Brown Lights Media! 🤍 Here are my Wedding Client Details:\n\n` +
                `👤 *Client Name:* ${clientName}\n` +
                `📱 *WhatsApp Number:* ${whatsapp}\n` +
                `📅 *Wedding Date:* ${weddingDate}\n` +
                `👰 *Wedding Coverage:* ${coverage}\n` +
                `📍 *Programme Venue:* ${venue}\n` +
                `👥 *Expected Guests:* ${guestCount}\n` +
                `📸 *Extra Photographer (>1000 guests):* ${extraPhotographer}\n` +
                `🎥 *Services Desired:* ${services}\n` +
                `🎞️ *Outputs Wanted:* ${outputs}\n` +
                `💰 *Approximate Budget:* ${budget}\n\n` +
                `Thank you for sharing your details! We will get back to you shortly.`;

            const encoded = encodeURIComponent(payload);
            window.open(`https://wa.me/919746558773?text=${encoded}`, '_blank');
            if (dreamModal) dreamModal.classList.remove('active');
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
