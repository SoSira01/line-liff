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
//main
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
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      btnShare.style.display = 'block';
      getUserProfile();
      getFriendship();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    btnShare.style.display = 'block';
    btnSend.style.display = 'block';
    getUserProfile();
    getFriendship();
  }

  btnOpenWindow.style.display = 'block';

  if (liff.isInClient() && liff.getOS() === 'android') {
    btnScanCode.style.display = 'block';
  }
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
        text: 'This message was sent by Cat',
      },
      {
        type: 'text',
        text: 'Test sendMessages',
      },
    ]);
    alert('Message sent');
  }
}

async function shareMsg() {
  const result = await liff.shareTargetPicker([
    {
      type: 'text',
      text: 'This message was sent by Cat',
    },
    // {
    //   type: 'image',
    //   originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    //   previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    // },
    {
      isMultiple: false,
    },
  ]);

  if (result) {
    liff.closeWindow();
  }
}

async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = '<b>Code: </b>' + result.value;
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
    liff.closeWindow();
  }
}

async function getFriendship() {
  let msg = 'Hooray! You and our chatbot are friend.';
  const friend = await liff.getFriendship();
  if (!friend.friendFlag) {
    msg =
      '<a href="https://line.me/R/ti/p/@BOT-ID">Follow our chatbot here!</a>';
  }
  friendShip.innerHTML = msg;
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

btnScanCode.onclick = () => {
  scanCode();
};

btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true,
  });
};

main();
