  //Javascript code for the explore page
  const profilePictures = document.querySelectorAll('.service-provider img');

profilePictures.forEach((picture) => {
    picture.addEventListener('click', () => {
        const mediumPicture = document.createElement('img');
        mediumPicture.src = picture.src;
        mediumPicture.style.width = '300px';
        mediumPicture.style.height = '300px';
        mediumPicture.style.borderRadius = '50%';
        mediumPicture.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        mediumPicture.style.position = 'fixed';
        mediumPicture.style.top = '50%';
        mediumPicture.style.left = '50%';
        mediumPicture.style.transform = 'translate(-50%, -50%)';
        mediumPicture.style.zIndex = '1000';
        mediumPicture.style.background = 'rgba(255, 255, 255, 0.9)';
        mediumPicture.style.padding = '20px';
        mediumPicture.style.border = '1px solid #ddd';

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        overlay.style.zIndex = '999';

        document.body.appendChild(overlay);
        document.body.appendChild(mediumPicture);

        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.removeChild(mediumPicture);
        });
    });
});
// Add an event listener to the button
const scrollBtn = document.querySelector('.scroll-btn');
const icon = scrollBtn.querySelector('i');

let isAtBottom = false;

// Add an event listener to the window to detect scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const docHeight = document.body.offsetHeight;

  if (scrollPosition >= docHeight && !isAtBottom) {
    isAtBottom = true;
    icon.classList.remove('fa-angle-down');
    icon.classList.add('fa-angle-up');
  } else if (scrollPosition < docHeight && isAtBottom) {
    isAtBottom = false;
    icon.classList.remove('fa-angle-up');
    icon.classList.add('fa-angle-down');
  }
});

scrollBtn.addEventListener('click', () => {
  if (isAtBottom) {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    // Scroll to bottom
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: 'smooth'
    });
  }
});
// Add an event listener to the arrow button
const arrowBtn = document.querySelector('.arrow-btn');
const createAccountBtn = document.querySelector('.create-account-btn');

let isArrowRight = false;

arrowBtn.addEventListener('click', () => {
  // Toggle the direction of the arrow
  if (isArrowRight) {
    
    isArrowRight = false;
  } else {
    
    isArrowRight = true;
  }

  // Toggle the display of the create account button
  createAccountBtn.style.display = createAccountBtn.style.display === 'none' ? 'block' : 'none';
});
// script.js
const form = document.getElementById('create-account-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const serviceProviderName = document.getElementById('service-provider-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const serviceType = document.getElementById('service-type').value;
    const description = document.getElementById('description').value;
    const profilePicture = document.getElementById('profile-picture').files[0];
    const servicePicture1 = document.getElementById('service-picture-1').files[0];
    const servicePicture2 = document.getElementById('service-picture-2').files[0];

    // Form validation
    if (serviceProviderName === '') {
        alert('Please enter your service provider name');
        return;
    }

    if (email === '') {
        alert('Please enter your email');
        return;
    }

    if (phone === '') {
        alert('Please enter your phone number');
        return;
    }

    if (serviceType === '') {
        alert('Please select your service type');
        return;
    }

    if (description === '') {
        alert('Please enter a description');
        return;
    }

    if (!profilePicture) {
        alert('Please upload a profile picture');
        return;
    }

    if (servicePicture1 && servicePicture2) {
        // Allow only two service pictures
        alert('You can only upload up to two service pictures');
        return;
    }

    // Create a new form data object
    const formData = new FormData();

    formData.append('serviceProviderName', serviceProviderName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('serviceType', serviceType);
    formData.append('description', description);
    formData.append('profilePicture', profilePicture);
    formData.append('servicePicture1', servicePicture1);
    formData.append('servicePicture2', servicePicture2);

    // Send the form data to the server
    fetch('/create-account', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to the confirmation page
            window.location.href = 'confirmation.html';
        } else {
            alert('Error creating account');
        }
    })
    .catch(error => {
      console.error(error);
      alert('Error creating account');
  })});
