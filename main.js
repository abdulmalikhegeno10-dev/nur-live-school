// የተማሪውን ስም ለጊዜው ለመያዝ
let currentStudentName = ""; 

// 1. ተመዝግቦ ወደ ቀጣዩ ክፍል ማለፍ
window.registerAndNext = function() {
    const nameInput = document.getElementById('studentName');
    const phoneInput = document.getElementById('phoneNumber');
    
    currentStudentName = nameInput.value.trim(); // ስሙን እዚህ እንይዘዋለን
    const phone = phoneInput.value.trim();

    if (currentStudentName === "" || phone === "") {
        alert("እባክዎ ስም እና ስልክ ያስገቡ!");
        return;
    }

    // Firebase ላይ መረጃውን መመዝገብ
    push(ref(db, 'students'), {
        fullName: currentStudentName,
        phone: phone,
        date: new Date().toLocaleString('am-ET')
    }).then(() => {
        // የምዝገባውን ፎርም መደበቅ
        document.getElementById('registration-section').style.display = 'none';
        // የቪዲዮ መግቢያውን ማሳየት
        document.getElementById('login-section').style.display = 'block';
    }).catch(err => alert("ስህተት አጋጥሟል፦ " + err.message));
};

// 2. የቪዲዮ ትምህርት መጀመር
window.startLesson = function() {
    const className = document.getElementById('className').value.trim();
    if (className === "") { alert("እባክዎ የክፍል ስም ያስገቡ!"); return; }

    const domain = 'meet.jit.si';
    
    // የ ክፍል ስሙን ወጥ ማድረግ
    const roomName = 'NurLive-' + className.replace(/\s+/g, '-');

    const options = {
        roomName: roomName,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#meet'),
        
        // --- ዋናው መፍትሄ እዚህ ጋር ነው ---
        configOverwrite: { 
            disableDeepLinking: true,   // ይህ ነው "Join in app" የሚለውን የሚያጠፋው!
            prejoinPageEnabled: false,  // ካሜራ መፈተሻ ገጽን ያልፋል
            startWithAudioMuted: false, 
            startWithVideoMuted: false,
            // ሞባይል ላይ አሳሹን (Browser) እንዲጠቀም ማስገደድ
            enableMobileOptimizedUi: false 
        },
        
        interfaceConfigOverwrite: { 
            MOBILE_APP_PROMO: false,    // የአፕ ማስታወቂያ እንዳይመጣ ያደርጋል
            SHOW_JITSI_WATERMARK: false,
            TOOLBAR_ALWAYS_VISIBLE: true,
            // ሞባይል ላይ አፕ አውርድ የሚለውን ቁልፍ ይደብቃል
            SHARING_FEATURES: ['email', 'url', 'telephone', 'whatsapp'] 
        },

        userInfo: {
            displayName: currentStudentName // ተማሪው ቅድም የተመዘገበበት ስም
        }
    };
    
    // የድሮውን ማጽዳት
    document.getElementById('meet').innerHTML = ""; 
    
    // አዲሱን መጀመር
    const api = new JitsiMeetExternalAPI(domain, options);
};
