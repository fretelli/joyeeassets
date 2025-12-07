// ============================================
// Firebase Authentication 配置和功能模块
// ============================================

/*
 * Firebase 配置说明：
 *
 * 1. 访问 https://console.firebase.google.com/
 * 2. 创建新项目或选择现有项目
 * 3. 在项目设置中找到"您的应用"部分
 * 4. 点击"添加应用" -> 选择"Web"
 * 5. 复制配置对象，替换下面的 firebaseConfig
 * 6. 在 Firebase 控制台启用 Authentication：
 *    - 进入 Authentication -> Sign-in method
 *    - 启用 "电子邮件/密码"
 *    - （可选）启用 "Google" 和 "GitHub" 登录
 *
 * 免费配额：每月 50,000 次认证操作
 */

// ⚠️ 请替换为您自己的 Firebase 配置
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 检查配置是否已更新
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

if (!isConfigured) {
    console.warn('⚠️ Firebase 配置尚未完成！请在 auth.js 中配置您的 Firebase 项目信息。');
    console.warn('📖 查看 FIREBASE_SETUP.md 了解详细配置步骤。');
}

// 动态导入 Firebase SDK (使用 CDN)
let auth = null;
let app = null;

// 初始化 Firebase
async function initFirebase() {
    if (!isConfigured) {
        console.error('Firebase 配置未完成');
        return false;
    }

    try {
        // 动态加载 Firebase SDK
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
        const {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            onAuthStateChanged,
            GoogleAuthProvider,
            GithubAuthProvider,
            signInWithPopup,
            updateProfile,
            sendPasswordResetEmail
        } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');

        // 初始化 Firebase
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);

        // 导出到全局，供其他模块使用
        window.firebase = {
            auth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            signOut,
            onAuthStateChanged,
            GoogleAuthProvider,
            GithubAuthProvider,
            signInWithPopup,
            updateProfile,
            sendPasswordResetEmail
        };

        console.log('✅ Firebase 初始化成功');
        return true;
    } catch (error) {
        console.error('Firebase 初始化失败:', error);
        return false;
    }
}

// ============================================
// 认证功能函数
// ============================================

// 邮箱密码注册
window.authRegister = async function(email, password, displayName) {
    if (!isConfigured) {
        throw new Error('Firebase 配置尚未完成，请查看 auth.js 文件配置说明');
    }

    if (!window.firebase) {
        await initFirebase();
    }

    const { createUserWithEmailAndPassword, updateProfile } = window.firebase;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // 更新用户显示名称
        if (displayName) {
            await updateProfile(user, { displayName });
        }

        console.log('注册成功:', user);

        // 保存用户信息到 localStorage
        saveUserToLocalStorage(user);

        // 跳转到个人中心
        window.location.href = 'profile.html';

        return user;
    } catch (error) {
        console.error('注册失败:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

// 邮箱密码登录
window.authLogin = async function(email, password) {
    if (!isConfigured) {
        throw new Error('Firebase 配置尚未完成，请查看 auth.js 文件配置说明');
    }

    if (!window.firebase) {
        await initFirebase();
    }

    const { signInWithEmailAndPassword } = window.firebase;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log('登录成功:', user);

        // 保存用户信息到 localStorage
        saveUserToLocalStorage(user);

        // 跳转到个人中心
        window.location.href = 'profile.html';

        return user;
    } catch (error) {
        console.error('登录失败:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

// Google 登录
window.authGoogleLogin = async function() {
    if (!isConfigured) {
        throw new Error('Firebase 配置尚未完成，请查看 auth.js 文件配置说明');
    }

    if (!window.firebase) {
        await initFirebase();
    }

    const { GoogleAuthProvider, signInWithPopup } = window.firebase;

    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log('Google 登录成功:', user);

        // 保存用户信息到 localStorage
        saveUserToLocalStorage(user);

        // 跳转到个人中心
        window.location.href = 'profile.html';

        return user;
    } catch (error) {
        console.error('Google 登录失败:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

// GitHub 登录
window.authGithubLogin = async function() {
    if (!isConfigured) {
        throw new Error('Firebase 配置尚未完成，请查看 auth.js 文件配置说明');
    }

    if (!window.firebase) {
        await initFirebase();
    }

    const { GithubAuthProvider, signInWithPopup } = window.firebase;

    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        console.log('GitHub 登录成功:', user);

        // 保存用户信息到 localStorage
        saveUserToLocalStorage(user);

        // 跳转到个人中心
        window.location.href = 'profile.html';

        return user;
    } catch (error) {
        console.error('GitHub 登录失败:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

// 退出登录
window.authLogout = async function() {
    if (!window.firebase) {
        await initFirebase();
    }

    const { signOut } = window.firebase;

    try {
        await signOut(auth);
        console.log('退出登录成功');

        // 清除本地存储
        localStorage.removeItem('user');

        // 跳转到首页
        window.location.href = 'index.html';
    } catch (error) {
        console.error('退出登录失败:', error);
        throw new Error('退出登录失败，请重试');
    }
};

// 密码重置
window.authResetPassword = async function(email) {
    if (!isConfigured) {
        throw new Error('Firebase 配置尚未完成，请查看 auth.js 文件配置说明');
    }

    if (!window.firebase) {
        await initFirebase();
    }

    const { sendPasswordResetEmail } = window.firebase;

    try {
        await sendPasswordResetEmail(auth, email);
        console.log('密码重置邮件已发送');
    } catch (error) {
        console.error('发送密码重置邮件失败:', error);
        throw new Error(getErrorMessage(error.code));
    }
};

// 检查登录状态
window.authCheckLogin = function() {
    const userStr = localStorage.getItem('user');
    return userStr !== null;
};

// 获取当前用户
window.authGetCurrentUser = function() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// 监听认证状态变化
window.authOnStateChanged = async function(callback) {
    if (!window.firebase) {
        await initFirebase();
    }

    const { onAuthStateChanged } = window.firebase;

    return onAuthStateChanged(auth, (user) => {
        if (user) {
            saveUserToLocalStorage(user);
        } else {
            localStorage.removeItem('user');
        }
        callback(user);
    });
};

// ============================================
// 辅助函数
// ============================================

// 保存用户信息到 localStorage
function saveUserToLocalStorage(user) {
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
    };
    localStorage.setItem('user', JSON.stringify(userData));
}

// 错误消息翻译
function getErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': '该邮箱已被注册',
        'auth/invalid-email': '邮箱格式不正确',
        'auth/operation-not-allowed': '该登录方式未启用',
        'auth/weak-password': '密码强度太弱，至少需要6个字符',
        'auth/user-disabled': '该账户已被禁用',
        'auth/user-not-found': '用户不存在',
        'auth/wrong-password': '密码错误',
        'auth/too-many-requests': '请求次数过多，请稍后再试',
        'auth/network-request-failed': '网络连接失败',
        'auth/popup-closed-by-user': '登录窗口已关闭',
        'auth/cancelled-popup-request': '登录请求已取消',
        'auth/popup-blocked': '登录弹窗被浏览器阻止，请允许弹窗后重试'
    };

    return errorMessages[errorCode] || '操作失败，请重试';
}

// 页面加载时初始化 Firebase
if (isConfigured) {
    initFirebase();
}
