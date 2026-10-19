/**
 * DV2027.UZ - Green Card DV-2027 Portal Logic
 * Dynamic conditional form, file preview, Telegram Bot API, masking and UI interactions
 */

// ==========================================================================
// 1. Telegram Bot API Configuration (O'zingizning Token va Chat ID laringizni kiriting)
// ==========================================================================
const TELEGRAM_CONFIG = {
  botToken: '8749807918:AAF1D4uZqfOb9aF2NtGN9a5cNUL1NUom0tE',
  chatId: '-1004332225482',
  adminChannel: 'https://t.me/greencarddv_2027'
};

// Store active form files for submission
const uploadedFiles = {
  main: null,
  spouse: null,
  children: {}
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPhoneMask();
  initQuickBar();
  initMaritalStatusLogic();
  initChildrenCounterLogic();
  initPhotoUploaders();
  initFormSubmission();
  initFaqAccordion();
  initPricingSelect();
});

// ==========================================================================
// 2. Navbar & Header Scroll Effect
// ==========================================================================
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking links on mobile
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1040) {
          navLinks.classList.remove('active');
        }
      });
    });

    // Close if clicked outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    });
  }
}

// ==========================================================================
// 3. Phone Number Mask (+998 __ ___-__-__)
// ==========================================================================
function initPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(input => {
    input.addEventListener('focus', () => {
      if (!input.value) {
        input.value = '+998 ';
      }
    });

    input.addEventListener('input', (e) => {
      let val = input.value.replace(/\D/g, '');
      if (!val.startsWith('998')) {
        val = '998' + val;
      }
      val = val.substring(0, 12); // 998 + 9 digits

      let formatted = '+998 ';
      if (val.length > 3) {
        formatted += '(' + val.substring(3, 5);
      }
      if (val.length >= 5) {
        formatted += ') ' + val.substring(5, 8);
      }
      if (val.length >= 8) {
        formatted += '-' + val.substring(8, 10);
      }
      if (val.length >= 10) {
        formatted += '-' + val.substring(10, 12);
      }
      input.value = formatted;
    });

    input.addEventListener('blur', () => {
      if (input.value === '+998 ' || input.value === '+998') {
        input.value = '';
      }
    });
  });
}

// ==========================================================================
// 4. Quick Bar Under Hero Interaction
// ==========================================================================
function initQuickBar() {
  const tabBtns = document.querySelectorAll('.quick-tab-btn');
  const quickSubmit = document.getElementById('quickSubmitBtn');
  let selectedPlan = 'single';

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPlan = btn.dataset.plan;
    });
  });

  if (quickSubmit) {
    quickSubmit.addEventListener('click', () => {
      const qName = document.getElementById('quickName')?.value.trim();
      const qBirth = document.getElementById('quickBirth')?.value;
      const qRegion = document.getElementById('quickRegion')?.value;
      const qPhone = document.getElementById('quickPhone')?.value.trim();

      // Autofill main form fields if filled
      if (qName) {
        const parts = qName.split(' ');
        if (parts.length > 1) {
          const mainLastName = document.getElementById('mainLastName');
          const mainFirstName = document.getElementById('mainFirstName');
          if (mainLastName) mainLastName.value = parts[0];
          if (mainFirstName) mainFirstName.value = parts.slice(1).join(' ');
        } else {
          const mainFirstName = document.getElementById('mainFirstName');
          if (mainFirstName) mainFirstName.value = qName;
        }
      }

      if (qBirth && document.getElementById('mainBirthDate')) {
        document.getElementById('mainBirthDate').value = qBirth;
      }

      if (qRegion && document.getElementById('mainRegion')) {
        document.getElementById('mainRegion').value = qRegion;
      }

      if (qPhone && document.getElementById('mainPhone')) {
        document.getElementById('mainPhone').value = qPhone;
      }

      // Set marital status based on quick bar tab
      const maritalSelect = document.getElementById('maritalStatus');
      if (maritalSelect) {
        if (selectedPlan === 'family') {
          maritalSelect.value = 'married';
        } else {
          maritalSelect.value = 'single';
        }
        maritalSelect.dispatchEvent(new Event('change'));
      }

      // Smooth scroll to form
      const formElem = document.getElementById('form');
      if (formElem) {
        formElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// ==========================================================================
// 5. Smart Conditional Fields: Marital Status
// ==========================================================================
function initMaritalStatusLogic() {
  const maritalSelect = document.getElementById('maritalStatus');
  const spouseBlock = document.getElementById('spouseBlock');

  if (maritalSelect && spouseBlock) {
    maritalSelect.addEventListener('change', () => {
      const isMarried = maritalSelect.value === 'married';
      if (isMarried) {
        spouseBlock.style.display = 'block';
        // Auto set spouse gender opposite of main applicant if selected
        updateSpouseGenderSuggestion();
      } else {
        spouseBlock.style.display = 'none';
        // Clear spouse photo
        uploadedFiles.spouse = null;
        const spousePreview = document.getElementById('spousePhotoPreview');
        const spouseZone = document.getElementById('spousePhotoZone');
        if (spousePreview) spousePreview.style.display = 'none';
        if (spouseZone) spouseZone.style.display = 'block';
      }
      updateFormProgress();
    });
  }

  // Watch main applicant gender to smartly toggle spouse gender
  const mainGenderRadios = document.querySelectorAll('input[name="mainGender"]');
  mainGenderRadios.forEach(radio => {
    radio.addEventListener('change', updateSpouseGenderSuggestion);
  });
}

function updateSpouseGenderSuggestion() {
  const selectedMainGender = document.querySelector('input[name="mainGender"]:checked')?.value;
  if (!selectedMainGender) return;

  const spouseMaleRadio = document.getElementById('spouseGenderMale');
  const spouseFemaleRadio = document.getElementById('spouseGenderFemale');

  if (selectedMainGender === 'Erkak' && spouseFemaleRadio) {
    spouseFemaleRadio.checked = true;
  } else if (selectedMainGender === 'Ayol' && spouseMaleRadio) {
    spouseMaleRadio.checked = true;
  }
}

// ==========================================================================
// 6. Dynamic Children Generator
// ==========================================================================
function initChildrenCounterLogic() {
  const childrenSelect = document.getElementById('childrenCount');
  const childrenContainer = document.getElementById('childrenContainer');

  if (childrenSelect && childrenContainer) {
    childrenSelect.addEventListener('change', () => {
      const count = parseInt(childrenSelect.value, 10) || 0;
      renderChildrenForms(count, childrenContainer);
      updateFormProgress();
    });
  }
}

function renderChildrenForms(count, container) {
  // Preserve any currently typed child values before clearing
  const savedData = [];
  container.querySelectorAll('.child-card').forEach((card) => {
    savedData.push({
      lastName: card.querySelector('.child-last-name')?.value || '',
      firstName: card.querySelector('.child-first-name')?.value || '',
      gender: card.querySelector('.child-gender')?.value || '',
      birthDate: card.querySelector('.child-birth-date')?.value || '',
      birthPlace: card.querySelector('.child-birth-place')?.value || ''
    });
  });

  container.innerHTML = '';
  if (count <= 0) {
    uploadedFiles.children = {};
    return;
  }

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
  const isRu = lang === 'ru';

  for (let i = 1; i <= count; i++) {
    const card = document.createElement('div');
    card.className = 'child-card';
    card.id = `childCard_${i}`;

    const prev = savedData[i - 1] || {};

    card.innerHTML = `
      <div class="child-card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 1 0-16 0"></path>
        </svg>
        <span>${isRu ? `${i}-й ребёнок (до 21 года)` : `${i}-farzand ma'lumotlari (21 yoshgacha)`}</span>
      </div>

      <div class="form-grid-3">
        <div class="form-field">
          <label class="field-label">${isRu ? 'Фамилия (Last Name)' : 'Familiyasi (Last Name)'} <span class="req">*</span></label>
          <input type="text" class="field-input child-last-name" data-child="${i}" placeholder="${isRu ? 'Латиницей (например: Valiyev)' : 'Lotincha (masalan: Valiyev)'}" value="${prev.lastName || ''}" required>
        </div>
        <div class="form-field">
          <label class="field-label">${isRu ? 'Имя (First Name)' : 'Ismi (First Name)'} <span class="req">*</span></label>
          <input type="text" class="field-input child-first-name" data-child="${i}" placeholder="${isRu ? 'Латиницей (например: Jasur)' : 'Lotincha (masalan: Jasur)'}" value="${prev.firstName || ''}" required>
        </div>
        <div class="form-field">
          <label class="field-label">${isRu ? 'Пол' : 'Jinsi'} <span class="req">*</span></label>
          <select class="field-select child-gender" data-child="${i}">
            <option value="Male" ${prev.gender === 'Male' || prev.gender === "O'g'il bola" ? 'selected' : ''}>${isRu ? 'Мальчик (Male)' : "O'g'il bola (Male)"}</option>
            <option value="Female" ${prev.gender === 'Female' || prev.gender === 'Qiz bola' ? 'selected' : ''}>${isRu ? 'Девочка (Female)' : 'Qiz bola (Female)'}</option>
          </select>
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-field">
          <label class="field-label">${isRu ? 'Дата рождения' : "Tug'ilgan sanasi"} <span class="req">*</span></label>
          <input type="date" class="field-input child-birth-date" data-child="${i}" value="${prev.birthDate || ''}" required>
        </div>
        <div class="form-field">
          <label class="field-label">${isRu ? 'Место рождения (Город/Район)' : "Tug'ilgan joyi (Shahar/Tuman)"} <span class="req">*</span></label>
          <input type="text" class="field-input child-birth-place" data-child="${i}" placeholder="${isRu ? 'Например: г. Ташкент' : 'Masalan: Toshkent shahri'}" value="${prev.birthPlace || ''}" required>
        </div>
      </div>

      <div class="form-field" style="margin-top: 10px;">
        <label class="field-label">${isRu ? `Фотография 5x5 (600x600 px) ${i}-го ребёнка` : `${i}-farzandning 5x5 (600x600 px) fotosurati`} <span class="req">*</span></label>
        
        <div class="photo-upload-zone" id="childZone_${i}">
          <div class="upload-icon-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div class="upload-title">${isRu ? 'Нажмите для загрузки или перетащите сюда' : 'Suratni yuklash uchun bosing yoki bu yerga tashlang'}</div>
          <div class="upload-desc">${isRu ? 'На белом фоне, лицо чётко видно (JPG / PNG)' : 'Oq fonda, yuzi to\'liq ko\'ringan 5x5 fotosurat (JPG / PNG)'}</div>
          <input type="file" class="upload-file-input child-file-input" data-child="${i}" accept="image/jpeg,image/png">
        </div>

        <div class="upload-preview-wrap" id="childPreview_${i}">
          <div class="preview-thumb-box">
            <img src="" alt="Child photo" id="childThumb_${i}">
          </div>
          <div class="preview-details">
            <div class="preview-name" id="childFileName_${i}">foto.jpg</div>
            <div class="preview-status">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${isRu ? 'Фотография загружена' : 'Fotosurat yuklandi (Auditga tayyor)'}</span>
            </div>
          </div>
          <button type="button" class="btn-remove-photo btn-remove-child-photo" data-child="${i}">${isRu ? 'Удалить' : "O'chirish"}</button>
        </div>
      </div>
    `;

    container.appendChild(card);
    setupChildPhotoUploader(i);
  }
}

// Re-render children cards on language change
window.addEventListener('languageChanged', () => {
  const childrenSelect = document.getElementById('childrenCount');
  const childrenContainer = document.getElementById('childrenContainer');
  if (childrenSelect && childrenContainer) {
    const count = parseInt(childrenSelect.value, 10) || 0;
    if (count > 0) {
      renderChildrenForms(count, childrenContainer);
    }
  }
});

function setupChildPhotoUploader(childIndex) {
  const zone = document.getElementById(`childZone_${childIndex}`);
  const input = zone?.querySelector('.child-file-input');
  const previewWrap = document.getElementById(`childPreview_${childIndex}`);
  const thumb = document.getElementById(`childThumb_${childIndex}`);
  const nameLabel = document.getElementById(`childFileName_${childIndex}`);
  const removeBtn = previewWrap?.querySelector('.btn-remove-child-photo');

  if (!input) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
    });
  });

  zone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleChildFile(file, childIndex, zone, previewWrap, thumb, nameLabel);
    }
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      handleChildFile(file, childIndex, zone, previewWrap, thumb, nameLabel);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      uploadedFiles.children[childIndex] = null;
      input.value = '';
      previewWrap.style.display = 'none';
      zone.style.display = 'block';
      updateFormProgress();
    });
  }
}

function handleChildFile(file, childIndex, zone, previewWrap, thumb, nameLabel) {
  uploadedFiles.children[childIndex] = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    thumb.src = e.target.result;
    nameLabel.textContent = file.name;
    zone.style.display = 'none';
    previewWrap.style.display = 'flex';
    updateFormProgress();
  };
  reader.readAsDataURL(file);
}

// ==========================================================================
// 7. Photo Uploaders: Main Applicant & Spouse
// ==========================================================================
function initPhotoUploaders() {
  // Main applicant
  setupUploader(
    'mainPhotoZone',
    'mainPhotoInput',
    'mainPhotoPreview',
    'mainPhotoThumb',
    'mainPhotoName',
    'btnRemoveMainPhoto',
    file => { uploadedFiles.main = file; updateFormProgress(); },
    () => { uploadedFiles.main = null; updateFormProgress(); }
  );

  // Spouse
  setupUploader(
    'spousePhotoZone',
    'spousePhotoInput',
    'spousePhotoPreview',
    'spousePhotoThumb',
    'spousePhotoName',
    'btnRemoveSpousePhoto',
    file => { uploadedFiles.spouse = file; updateFormProgress(); },
    () => { uploadedFiles.spouse = null; updateFormProgress(); }
  );
}

function setupUploader(zoneId, inputId, previewId, thumbId, nameId, removeBtnId, onSelect, onRemove) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  const previewWrap = document.getElementById(previewId);
  const thumb = document.getElementById(thumbId);
  const nameLabel = document.getElementById(nameId);
  const removeBtn = document.getElementById(removeBtnId);

  if (!zone || !input) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
    });
  });

  zone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (file) {
      handleFile(file);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      input.value = '';
      previewWrap.style.display = 'none';
      zone.style.display = 'block';
      onRemove();
    });
  }

  function handleFile(file) {
    if (!file) return;

    const isRu = window.i18n && window.i18n.getCurrentLanguage() === 'ru';

    // 1. Fayl formati tekshiruvi (JPG, JPEG, PNG, WEBP)
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast(isRu ? "Faqat JPG, JPEG yoki PNG formatdagi rasm qabul qilinadi!" : "Faqat JPG, JPEG yoki PNG formatdagi rasm yuklang!", "error");
      input.value = '';
      return;
    }

    // 2. Fayl hajmi tekshiruvi (Max 10 MB)
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      showToast(isRu ? "Размер фотографии не должен превышать 10 МБ!" : "Fotosurat hajmi 10 MB dan oshmasligi kerak!", "error");
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      thumb.src = e.target.result;
      nameLabel.textContent = file.name;
      zone.style.display = 'none';
      previewWrap.style.display = 'flex';
      onSelect(file);
      showToast(isRu ? "Фотография успешно прикреплена! ✅" : "Fotosurat muvaffaqiyatli biriktirildi! ✅", "success");
    };
    reader.readAsDataURL(file);
  }
}

// ==========================================================================
// 8. Pricing Plan Direct Selection
// ==========================================================================
function initPricingSelect() {
  const btnPlanSingle = document.getElementById('btnSelectPlanSingle');
  const btnPlanFamily = document.getElementById('btnSelectPlanFamily');
  const maritalSelect = document.getElementById('maritalStatus');

  if (btnPlanSingle) {
    btnPlanSingle.addEventListener('click', () => {
      if (maritalSelect) {
        maritalSelect.value = 'single';
        maritalSelect.dispatchEvent(new Event('change'));
      }
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (btnPlanFamily) {
    btnPlanFamily.addEventListener('click', () => {
      if (maritalSelect) {
        maritalSelect.value = 'married';
        maritalSelect.dispatchEvent(new Event('change'));
      }
      document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// ==========================================================================
// 9. FAQ Accordion
// ==========================================================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ==========================================================================
// 10. Form Progress Update
// ==========================================================================
function updateFormProgress() {
  const stepNodes = document.querySelectorAll('.step-node');
  const progressLine = document.querySelector('.stepper-progress-line');

  const mainLastName = document.getElementById('mainLastName')?.value.trim();
  const mainFirstName = document.getElementById('mainFirstName')?.value.trim();
  const mainPhone = document.getElementById('mainPhone')?.value.trim();
  const hasMainPhoto = !!uploadedFiles.main;

  const maritalStatus = document.getElementById('maritalStatus')?.value;
  const isMarried = maritalStatus === 'married';
  const childrenCount = parseInt(document.getElementById('childrenCount')?.value, 10) || 0;

  // Step 1 check
  const step1Complete = !!(mainLastName && mainFirstName && mainPhone && hasMainPhoto);
  
  // Step 2 check
  let step2Complete = true;
  if (isMarried) {
    const spouseLastName = document.getElementById('spouseLastName')?.value.trim();
    const spouseFirstName = document.getElementById('spouseFirstName')?.value.trim();
    const hasSpousePhoto = !!uploadedFiles.spouse;
    if (!spouseLastName || !spouseFirstName || !hasSpousePhoto) {
      step2Complete = false;
    }
  }

  if (childrenCount > 0) {
    for (let i = 1; i <= childrenCount; i++) {
      if (!uploadedFiles.children[i]) {
        step2Complete = false;
      }
    }
  }

  if (step1Complete) {
    stepNodes[0]?.classList.add('completed');
    stepNodes[1]?.classList.add('active');
    if (progressLine) progressLine.style.width = '66%';
  } else {
    stepNodes[0]?.classList.remove('completed');
    stepNodes[0]?.classList.add('active');
    stepNodes[1]?.classList.remove('active', 'completed');
    if (progressLine) progressLine.style.width = '33%';
  }

  if (step1Complete && step2Complete) {
    stepNodes[1]?.classList.add('completed');
    stepNodes[2]?.classList.add('active');
    if (progressLine) progressLine.style.width = '100%';
  }
}

// ==========================================================================
// 11. Form Submission & Telegram Bot Integration
// ==========================================================================
function initFormSubmission() {
  const form = document.getElementById('dvApplicationForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validation check
    const mainLastName = document.getElementById('mainLastName')?.value.trim();
    const mainFirstName = document.getElementById('mainFirstName')?.value.trim();
    const mainPhone = document.getElementById('mainPhone')?.value.trim();
    const consent = document.getElementById('consentCheck')?.checked;

    const isRu = window.i18n && window.i18n.getCurrentLanguage() === 'ru';

    if (!consent) {
      showToast(isRu ? "Пожалуйста, подтвердите согласие с правилами оформления!" : "Iltimos, ma'lumotlar to'g'riligi va qoidalar bilan tanishganingizni tasdiqlang!", "error");
      return;
    }

    if (!uploadedFiles.main) {
      showToast(isRu ? "Пожалуйста, прикрепите фотографию главного заявителя!" : "Iltimos, asosiy ariza beruvchining fotosuratini yuklang!", "error");
      document.getElementById('mainPhotoZone')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const maritalStatus = document.getElementById('maritalStatus')?.value;
    if (maritalStatus === 'married') {
      const spouseLast = document.getElementById('spouseLastName')?.value.trim();
      const spouseFirst = document.getElementById('spouseFirstName')?.value.trim();
      if (!spouseLast || !spouseFirst) {
        showToast(isRu ? "Пожалуйста, укажите имя и фамилию супруга/супруги!" : "Iltimos, turmush o'rtog'ingizning ism va familiyasini to'liq kiriting!", "error");
        document.getElementById('spouseBlock')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      if (!uploadedFiles.spouse) {
        showToast(isRu ? "Пожалуйста, прикрепите фотографию супруга/супруги!" : "Iltimos, turmush o'rtog'ingizning 5x5 fotosuratini yuklang!", "error");
        document.getElementById('spouseBlock')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    const submitBtn = document.getElementById('btnSubmitForm');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      <span>${isRu ? "Регистрация в базе..." : "Rasmiy bazaga yuborilmoqda..."}</span>
    `;

    // Generate unique application ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const applicationId = `DV2027-UZ-${randomSuffix}`;

    // Collect all data
    const formDataObj = {
      appId: applicationId,
      date: new Date().toLocaleString('uz-UZ'),
      applicant: {
        lastName: mainLastName,
        firstName: mainFirstName,
        middleName: document.getElementById('mainMiddleName')?.value.trim() || "Mavjud emas",
        gender: document.querySelector('input[name="mainGender"]:checked')?.value || "Ko'rsatilmagan",
        birthDate: document.getElementById('mainBirthDate')?.value || "Ko'rsatilmagan",
        country: document.getElementById('mainCountry')?.value || "O'zbekiston",
        region: document.getElementById('mainRegion')?.value || "Ko'rsatilmagan",
        city: document.getElementById('mainCity')?.value.trim() || "Ko'rsatilmagan",
        education: document.getElementById('mainEducation')?.value || "Ko'rsatilmagan",
        address: document.getElementById('mainAddress')?.value.trim() || "Ko'rsatilmagan",
        phone: mainPhone,
        telegram: document.getElementById('mainTelegram')?.value.trim() || "Mavjud emas"
      },
      maritalStatus: maritalStatus === 'married' ? 'Oilali (Turmush qurgan)' : (maritalStatus === 'divorced' ? 'Ajrashgan' : (maritalStatus === 'widowed' ? 'Beva' : 'Bo\'ydoq')),
      spouse: null,
      childrenCount: parseInt(document.getElementById('childrenCount')?.value, 10) || 0,
      children: []
    };

    if (maritalStatus === 'married') {
      formDataObj.spouse = {
        lastName: document.getElementById('spouseLastName')?.value.trim(),
        firstName: document.getElementById('spouseFirstName')?.value.trim(),
        gender: document.querySelector('input[name="spouseGender"]:checked')?.value || "Ayol",
        birthDate: document.getElementById('spouseBirthDate')?.value || "Ko'rsatilmagan",
        country: document.getElementById('spouseCountry')?.value || "O'zbekiston",
        birthPlace: document.getElementById('spouseBirthPlace')?.value.trim() || "Ko'rsatilmagan",
        education: document.getElementById('spouseEducation')?.value || "Ko'rsatilmagan"
      };
    }

    if (formDataObj.childrenCount > 0) {
      for (let i = 1; i <= formDataObj.childrenCount; i++) {
        if (!uploadedFiles.children[i]) {
          showToast(isRu ? `Пожалуйста, прикрепите фотографию для ${i}-го ребенка!` : `Iltimos, ${i}-farzandingiz fotosuratini yuklang!`, "error");
          document.getElementById(`childPhotoZone_${i}`)?.scrollIntoView({ behavior: 'smooth' });
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          return;
        }

        formDataObj.children.push({
          index: i,
          lastName: document.querySelector(`.child-last-name[data-child="${i}"]`)?.value.trim() || "",
          firstName: document.querySelector(`.child-first-name[data-child="${i}"]`)?.value.trim() || "",
          gender: document.querySelector(`.child-gender[data-child="${i}"]`)?.value || "",
          birthDate: document.querySelector(`.child-birth-date[data-child="${i}"]`)?.value || "",
          birthPlace: document.querySelector(`.child-birth-place[data-child="${i}"]`)?.value.trim() || ""
        });
      }
    }

    // Send to Telegram Bot
    try {
      await sendToTelegramBot(formDataObj);
    } catch (err) {
      console.warn("Telegram botga yuborishda xatolik (token sozlanmagan bo'lishi mumkin):", err);
    }

    // Save to localStorage as a backup
    try {
      const savedApplications = JSON.parse(localStorage.getItem('dv2027_applications') || '[]');
      savedApplications.push(formDataObj);
      localStorage.setItem('dv2027_applications', JSON.stringify(savedApplications));
    } catch (e) {
      // storage quota or private mode
    }

    // Restore button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // Show Success Modal
    showSuccessModal(formDataObj);
    showToast(isRu ? "Заявка успешно принята и отправлена! ✅" : "Arizangiz muvaffaqiyatli qabul qilindi va yuborildi! ✅", "success");

    // Clean form reset
    form.reset();
    uploadedFiles.main = null;
    uploadedFiles.spouse = null;
    uploadedFiles.children = {};
    document.querySelectorAll('.upload-preview-wrap').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.photo-upload-zone').forEach(el => el.style.display = 'block');
    updateFormProgress();
  });
}

// Function to send structured message and photos via Serverless API or direct fallback
async function sendToTelegramBot(data) {
  // Convert File object to Base64
  const fileToBase64 = (file) => {
    return new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  // Prepare payload with photos
  const filesPayload = [];
  if (uploadedFiles.main) {
    const b64 = await fileToBase64(uploadedFiles.main);
    if (b64) {
      filesPayload.push({
        role: 'main',
        name: uploadedFiles.main.name || 'main-applicant.jpg',
        type: uploadedFiles.main.type || 'image/jpeg',
        base64: b64,
        caption: `👤 [${data.appId}] Asosiy arizachi fotosurati: ${data.applicant.lastName} ${data.applicant.firstName}`
      });
    }
  }

  if (uploadedFiles.spouse) {
    const b64 = await fileToBase64(uploadedFiles.spouse);
    if (b64) {
      filesPayload.push({
        role: 'spouse',
        name: uploadedFiles.spouse.name || 'spouse.jpg',
        type: uploadedFiles.spouse.type || 'image/jpeg',
        base64: b64,
        caption: `👰 [${data.appId}] Turmush o'rtog'i fotosurati: ${data.spouse?.lastName || ''} ${data.spouse?.firstName || ''}`
      });
    }
  }

  if (data.childrenCount > 0) {
    for (let i = 1; i <= data.childrenCount; i++) {
      if (uploadedFiles.children[i]) {
        const b64 = await fileToBase64(uploadedFiles.children[i]);
        if (b64) {
          filesPayload.push({
            role: `child_${i}`,
            name: uploadedFiles.children[i].name || `child_${i}.jpg`,
            type: uploadedFiles.children[i].type || 'image/jpeg',
            base64: b64,
            caption: `👶 [${data.appId}] ${i}-farzand fotosurati`
          });
        }
      }
    }
  }

  // 1. Try secure Serverless API first (/api/submit) - keeps bot token private in Vercel
  try {
    const apiRes = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formData: data,
        files: filesPayload
      })
    });
    if (apiRes.ok) {
      return; // Successfully delivered through secure backend!
    }
  } catch (apiErr) {
    console.warn("Serverless API endpoint unavailable, falling back to direct dispatch:", apiErr);
  }

  // 2. Direct Fallback Dispatch (e.g., local preview)
  if (!TELEGRAM_CONFIG.botToken || TELEGRAM_CONFIG.botToken === 'YOUR_BOT_TOKEN_HERE') {
    return;
  }

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  let text = `🇺🇸 <b>YANGI DV-2027 ANKETASI TUSHDI!</b>\n\n`;
  text += `🆔 <b>Ariza Kodi:</b> <code>${escapeHtml(data.appId)}</code>\n`;
  text += `📅 <b>Vaqti:</b> ${escapeHtml(data.date)}\n`;
  text += `--------------------------------------\n`;
  text += `👤 <b>ASOSIY ARIZACHI:</b>\n`;
  text += `• <b>F.I.SH:</b> ${escapeHtml(data.applicant.lastName)} ${escapeHtml(data.applicant.firstName)} ${escapeHtml(data.applicant.middleName)}\n`;
  text += `• <b>Jinsi:</b> ${escapeHtml(data.applicant.gender)}\n`;
  text += `• <b>Tug'ilgan sana:</b> ${escapeHtml(data.applicant.birthDate)}\n`;
  text += `• <b>Tug'ilgan joyi:</b> ${escapeHtml(data.applicant.country)}, ${escapeHtml(data.applicant.region)}, ${escapeHtml(data.applicant.city)}\n`;
  text += `• <b>Ta'lim:</b> ${escapeHtml(data.applicant.education)}\n`;
  text += `• <b>Manzil:</b> ${escapeHtml(data.applicant.address)}\n`;
  text += `• <b>Telefon:</b> <code>${escapeHtml(data.applicant.phone)}</code>\n`;
  text += `• <b>Telegram:</b> ${escapeHtml(data.applicant.telegram)}\n\n`;
  text += `💍 <b>Oilaviy holati:</b> ${escapeHtml(data.maritalStatus)}\n`;

  if (data.spouse) {
    text += `\n👰 <b>TURMUSH O'RTOG'I:</b>\n`;
    text += `• <b>F.I:</b> ${escapeHtml(data.spouse.lastName)} ${escapeHtml(data.spouse.firstName)}\n`;
    text += `• <b>Jinsi:</b> ${escapeHtml(data.spouse.gender)}\n`;
    text += `• <b>Tug'ilgan sana:</b> ${escapeHtml(data.spouse.birthDate)}\n`;
    text += `• <b>Tug'ilgan joyi:</b> ${escapeHtml(data.spouse.country)}, ${escapeHtml(data.spouse.birthPlace)}\n`;
    text += `• <b>Ta'limi:</b> ${escapeHtml(data.spouse.education)}\n`;
  }

  if (data.childrenCount > 0) {
    text += `\n👶 <b>FARZANDLARI (${data.childrenCount} ta):</b>\n`;
    data.children.forEach(c => {
      text += `• <b>${c.index}-bola:</b> ${escapeHtml(c.lastName)} ${escapeHtml(c.firstName)} | ${escapeHtml(c.gender)} | ${escapeHtml(c.birthDate)} | ${escapeHtml(c.birthPlace)}\n`;
    });
  }

  text += `\n--------------------------------------\n`;
  text += `⚡ <b>Tizim:</b> DV2027.UZ rasmiy portali\n`;

  // 1. Build interactive inline action buttons to message client
  const keyboardButtons = [];
  const rawTg = data.applicant.telegram ? data.applicant.telegram.replace('@', '').trim() : '';
  const rawPhone = data.applicant.phone ? data.applicant.phone.replace(/[^0-9]/g, '') : '';

  if (rawTg && rawTg !== 'Mavjud emas') {
    keyboardButtons.push([
      {
        text: `💬 Telegram orqali yozish (@${rawTg})`,
        url: `https://t.me/${rawTg}`
      }
    ]);
  }

  if (rawPhone) {
    keyboardButtons.push([
      {
        text: `📞 Tel orqali Telegram ochish (+${rawPhone})`,
        url: `https://t.me/+${rawPhone}`
      }
    ]);
  }

  // Send Text Report
  const textUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
  try {
    const payload = {
      chat_id: TELEGRAM_CONFIG.chatId,
      text: text,
      parse_mode: 'HTML'
    };

    if (keyboardButtons.length > 0) {
      payload.reply_markup = {
        inline_keyboard: keyboardButtons
      };
    }

    await fetch(textUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Telegramga matn yuborishda xatolik:", err);
  }

  // 2. Helper to send photo file as document (preserving original 600x600 quality)
  const sendPhotoFile = async (file, caption) => {
    if (!file) return;
    const docUrl = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendDocument`;
    const formData = new FormData();
    formData.append('chat_id', TELEGRAM_CONFIG.chatId);
    formData.append('document', file);
    formData.append('caption', caption);
    try {
      await fetch(docUrl, {
        method: 'POST',
        body: formData
      });
    } catch (e) {
      console.error("Rasm yuborishda xatolik:", e);
    }
  };

  // Send Main Applicant Photo
  if (uploadedFiles.main) {
    await sendPhotoFile(uploadedFiles.main, `👤 [${data.appId}] Asosiy arizachi fotosurati: ${data.applicant.lastName} ${data.applicant.firstName}`);
  }

  // Send Spouse Photo
  if (uploadedFiles.spouse) {
    await sendPhotoFile(uploadedFiles.spouse, `👰 [${data.appId}] Turmush o'rtog'i fotosurati: ${data.spouse?.lastName || ''} ${data.spouse?.firstName || ''}`);
  }

  // Send Children Photos
  if (data.childrenCount > 0) {
    for (let i = 1; i <= data.childrenCount; i++) {
      if (uploadedFiles.children[i]) {
        await sendPhotoFile(uploadedFiles.children[i], `👶 [${data.appId}] ${i}-farzand fotosurati`);
      }
    }
  }
}

// ==========================================================================
// 12. Success Modal Logic
// ==========================================================================
function showSuccessModal(data) {
  const modal = document.getElementById('successModal');
  const codeElem = document.getElementById('modalAppCode');
  const nameElem = document.getElementById('modalApplicantName');
  const planElem = document.getElementById('modalPlanName');
  const priceElem = document.getElementById('modalPlanPrice');
  const closeBtn = document.getElementById('btnModalClose');
  const copyBtn = document.getElementById('btnModalCopy');
  const tgBtn = document.getElementById('btnModalTg');

  const lang = window.i18n ? window.i18n.getCurrentLanguage() : 'uz';
  const isRu = lang === 'ru';

  if (codeElem) codeElem.textContent = data.appId;
  if (nameElem) nameElem.textContent = `${data.applicant.lastName} ${data.applicant.firstName}`;
  
  const isFamily = data.maritalStatus.includes('Oilali') || data.maritalStatus === 'married';
  if (planElem) planElem.textContent = isFamily 
    ? (isRu ? "Семейная анкета (2X Шанс)" : "Oilaviy Anketa (2X Imkoniyat)") 
    : (isRu ? "Анкета для одного (Холост)" : "Bo'ydoq (Yolg'iz) Anketa");
  if (priceElem) priceElem.textContent = isFamily 
    ? (isRu ? "149 000 сум" : "149 000 so'm") 
    : (isRu ? "99 000 сум" : "99 000 so'm");

  if (modal) {
    modal.style.display = 'flex';
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(data.appId).then(() => {
        copyBtn.textContent = isRu ? "Скопировано! ✅" : "Nusxalandi! ✅";
        setTimeout(() => {
          copyBtn.textContent = isRu ? "Копировать код" : "Kodni nusxalash";
        }, 2000);
      });
    };
  }

  if (tgBtn) {
    tgBtn.onclick = () => {
      window.open(TELEGRAM_CONFIG.adminChannel, '_blank');
    };
  }
}

// ==========================================================================
// 13. Modern Toast Notification Utility
// ==========================================================================
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-message toast-${type}`;

  let iconSvg = '';
  if (type === 'error') {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else if (type === 'success') {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else {
    iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-text">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      toast.remove();
    }, 280);
  }, 4000);
}
