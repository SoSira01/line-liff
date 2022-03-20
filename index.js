// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1656989109-G0WqnkEL' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }

  if (!liff.isInClient()) {
    btnLogIn.style.display = 'block';
    btnLogOut.style.display = 'block';
  }

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  }

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      btnShare.style.display = 'block';
      getUserProfile();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    btnSend.style.display = 'block';
    btnShare.style.display = 'block';
    getUserProfile();
  }

  getUserProfile();
}

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'This message was sent by sendMessages()',
      },
    ]);
    alert('Message sent');
  }
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
      previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    },
  ]);
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

btnShare.onclick = () => {
  shareMsg();
};

btnSend.onclick = () => {
  sendMsg();
};

main();
