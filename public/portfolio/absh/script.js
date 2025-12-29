const distributionForm = document.querySelector('[data-distribution-form]');
const distributionStatus = document.querySelector('[data-status]');
const distributionLog = document.querySelector('[data-log]');
const startButton = document.querySelector('[data-start]');
const fileInput = document.querySelector('[data-file]');

const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-contact-status]');

const gateForm = document.querySelector('[data-gate-form]');
const gateInput = document.querySelector('[data-gate-input]');
const gateStatus = document.querySelector('[data-gate-status]');
const gateCard = document.querySelector('[data-gate-card]');
const gatedSection = document.querySelector('[data-gated]');
const GATE_PASSWORD = 'bondsecure';

function addLogLine(text) {
  if (!distributionLog) return;
  const li = document.createElement('li');
  li.textContent = text;
  distributionLog.appendChild(li);
}

function clearLog() {
  if (distributionLog) distributionLog.innerHTML = '';
}

function getSelectedPlatforms() {
  if (!distributionForm) return [];
  return Array.from(distributionForm.querySelectorAll('input[name="platform"]:checked')).map((el) => el.value);
}

startButton?.addEventListener('click', () => {
  if (!fileInput?.files?.length) {
    distributionStatus.textContent = 'Add a video file to start.';
    return;
  }

  const platforms = getSelectedPlatforms();
  if (!platforms.length) {
    distributionStatus.textContent = 'Choose at least one platform to distribute.';
    return;
  }

  distributionStatus.textContent = 'Queueing distribution...';
  clearLog();
  addLogLine('Upload secured. Preparing exports...');

  let delay = 400;
  platforms.forEach((platform) => {
    setTimeout(() => addLogLine(`Optimizing aspect ratio for ${platform}`), (delay += 300));
    setTimeout(() => addLogLine(`Queued for ${platform} publish`), (delay += 300));
  });

  setTimeout(() => {
    distributionStatus.textContent = 'Ready for publishing. Connect APIs to push live.';
  }, delay + 400);
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());
  
  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.disabled = true;
  
  try {
    fetch('https://srkxp7r75qfs5yjzxfza6klqte0izcfx.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    
    contactForm.reset();
    button.textContent = 'Thanks!';
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  } catch (error) {
    contactForm.reset();
    button.textContent = 'Thanks!';
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 3000);
  }
});

gateForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = gateInput?.value.trim() || '';
  if (value === GATE_PASSWORD) {
    gatedSection?.removeAttribute('hidden');
    gateStatus.textContent = 'Access granted. Upload is unlocked.';
    gateStatus.classList.add('success');
    gateForm.classList.add('is-hidden');
    gateCard?.classList.add('gate-card--unlocked');
  } else {
    gateStatus.textContent = 'Incorrect password. Try again.';
    gateStatus.classList.remove('success');
  }
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.profile-card-full, .write-in-text').forEach(el => {
  observer.observe(el);
});

const listingForm = document.querySelector('[data-listing-form]');
const listingStatus = document.querySelector('[data-listing-status]');
const MAPBOX_TOKEN = 'pk.eyJ1IjoibWpmeGphcyIsImEiOiJjbWlwZThjaGcwMDEwM2dxMHNseGJiZWV0In0.O92-6fzIpmZM64NIDEptMA';

listingForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(listingForm);
  const data = Object.fromEntries(formData.entries());
  
  listingStatus.textContent = 'Validating address...';
  listingStatus.className = 'form-status';
  listingStatus.style.display = 'block';
  
  try {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`);
    const geoData = await response.json();
    
    if (!geoData.features || geoData.features.length === 0) {
      throw new Error('Address not found');
    }
    
    const [lng, lat] = geoData.features[0].center;
    const listing = {
      ...data,
      lng,
      lat,
      type: data.status,
      title: `${data.beds}BD / ${data.baths}BA - ${data.price}`,
      description: data.address,
      url: data.url || null
    };
    
    let listings = JSON.parse(localStorage.getItem('listings') || '[]');
    listings.push(listing);
    localStorage.setItem('listings', JSON.stringify(listings));
    
    listingStatus.textContent = `✓ Added to map! View on Area page.`;
    listingStatus.className = 'form-status success';
    listingForm.reset();
    
    setTimeout(() => {
      listingStatus.style.display = 'none';
    }, 5000);
  } catch (error) {
    listingStatus.textContent = `✗ ${error.message}. Check address format.`;
    listingStatus.className = 'form-status error';
  }
});
