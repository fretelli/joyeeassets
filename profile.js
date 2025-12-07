// 个人中心页面逻辑
document.addEventListener('DOMContentLoaded', async function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const profileContainer = document.getElementById('profileContainer');

    // 检查登录状态
    const user = window.authGetCurrentUser ? window.authGetCurrentUser() : null;

    if (!user) {
        // 未登录，跳转到登录页
        window.location.href = 'login.html';
        return;
    }

    // 显示用户信息
    displayUserInfo(user);

    // 隐藏加载界面
    loadingScreen.style.display = 'none';
    profileContainer.style.display = 'block';

    // 绑定按钮事件
    bindEvents();
});

// 显示用户信息
function displayUserInfo(user) {
    // 头像
    const avatarElement = document.getElementById('profileAvatar');
    if (user.photoURL) {
        avatarElement.innerHTML = `<img src="${user.photoURL}" alt="Avatar">`;
    } else {
        // 使用用户名首字母作为头像
        const initial = user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
        avatarElement.innerHTML = initial;
    }

    // 用户名
    const nameElement = document.getElementById('profileName');
    nameElement.textContent = user.displayName || '未设置用户名';

    // 邮箱
    const emailElement = document.getElementById('profileEmail');
    emailElement.textContent = user.email;

    // 邮箱验证徽章
    const badgeElement = document.getElementById('emailVerificationBadge');
    if (user.emailVerified) {
        badgeElement.innerHTML = `
            <span class="verified-badge">
                <i class="fas fa-check-circle"></i>
                邮箱已验证
            </span>
        `;
    } else {
        badgeElement.innerHTML = `
            <span class="unverified-badge">
                <i class="fas fa-exclamation-circle"></i>
                邮箱未验证
            </span>
        `;
    }

    // 账户信息
    document.getElementById('infoUid').textContent = user.uid.substring(0, 20) + '...';

    // 从 localStorage 获取更多信息（如果有）
    const loginStats = JSON.parse(localStorage.getItem('loginStats')) || {
        firstLogin: new Date().toISOString(),
        loginCount: 1,
        lastLogin: new Date().toISOString()
    };

    // 更新登录统计
    loginStats.loginCount++;
    loginStats.lastLogin = new Date().toISOString();
    localStorage.setItem('loginStats', JSON.stringify(loginStats));

    // 计算注册天数
    const firstLoginDate = new Date(loginStats.firstLogin);
    const today = new Date();
    const daysDiff = Math.floor((today - firstLoginDate) / (1000 * 60 * 60 * 24));
    document.getElementById('statDays').textContent = daysDiff;

    // 登录次数
    document.getElementById('statLogins').textContent = loginStats.loginCount;

    // 注册时间
    document.getElementById('infoCreated').textContent = formatDate(firstLoginDate);

    // 最后登录
    document.getElementById('infoLastLogin').textContent = formatDateTime(new Date(loginStats.lastLogin));

    // 登录方式
    const provider = getProviderName(user);
    document.getElementById('infoProvider').textContent = provider;
}

// 获取登录方式名称
function getProviderName(user) {
    // Firebase 会在 user 对象中包含 providerData
    // 但由于我们使用 localStorage，我们可以根据 email 和 photoURL 推断
    if (user.photoURL && user.photoURL.includes('googleusercontent.com')) {
        return 'Google 账号';
    } else if (user.photoURL && user.photoURL.includes('githubusercontent.com')) {
        return 'GitHub 账号';
    } else {
        return '邮箱密码';
    }
}

// 格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 格式化日期时间
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 绑定按钮事件
function bindEvents() {
    // 退出登录按钮
    document.getElementById('logoutBtn').addEventListener('click', async function() {
        if (confirm('确定要退出登录吗？')) {
            try {
                if (window.authLogout) {
                    await window.authLogout();
                } else {
                    // 如果 Firebase 未初始化，直接清除本地存储
                    localStorage.removeItem('user');
                    localStorage.removeItem('loginStats');
                    window.location.href = 'index.html';
                }
            } catch (error) {
                alert('退出登录失败：' + error.message);
            }
        }
    });

    // 编辑资料按钮
    document.getElementById('editProfileBtn').addEventListener('click', function() {
        const user = window.authGetCurrentUser();
        const newName = prompt('请输入新的用户名：', user.displayName || '');

        if (newName && newName !== user.displayName) {
            // 更新本地存储的用户名
            user.displayName = newName;
            localStorage.setItem('user', JSON.stringify(user));

            // 更新页面显示
            document.getElementById('profileName').textContent = newName;

            // 更新头像（如果没有照片）
            const avatarElement = document.getElementById('profileAvatar');
            if (!user.photoURL) {
                const initial = newName.charAt(0).toUpperCase();
                avatarElement.innerHTML = initial;
            }

            alert('用户名已更新！\n\n注意：这个更新只保存在本地浏览器中。如果需要同步到 Firebase，请确保已配置 Firebase 并使用 updateProfile API。');
        }
    });

    // 修改密码按钮
    document.getElementById('changePasswordBtn').addEventListener('click', async function() {
        const user = window.authGetCurrentUser();

        if (user.email) {
            if (confirm(`我们将向您的邮箱 ${user.email} 发送密码重置链接，是否继续？`)) {
                try {
                    if (window.authResetPassword) {
                        await window.authResetPassword(user.email);
                        alert('密码重置邮件已发送！请查收您的邮箱。');
                    } else {
                        alert('Firebase 配置尚未完成，无法发送密码重置邮件。');
                    }
                } catch (error) {
                    alert('发送失败：' + error.message);
                }
            }
        } else {
            alert('无法修改密码：未找到邮箱信息');
        }
    });
}
