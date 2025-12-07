// 登录页面交互逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 标签切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;

            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // 切换表单
            if (tab === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });

    // 密码显示/隐藏切换
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const input = document.getElementById(targetId);

            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // 表单验证辅助函数
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    function clearAllErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.style.display = 'none');
    }

    // 邮箱验证
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // 登录表单提交
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearAllErrors();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;

        // 验证
        let hasError = false;

        if (!email) {
            showError('loginEmail', '请输入邮箱地址');
            hasError = true;
        } else if (!validateEmail(email)) {
            showError('loginEmail', '请输入有效的邮箱地址');
            hasError = true;
        }

        if (!password) {
            showError('loginPassword', '请输入密码');
            hasError = true;
        }

        if (hasError) return;

        // 显示加载动画
        showLoading();

        try {
            // 调用 Firebase 登录 (在 auth.js 中定义)
            if (window.authLogin) {
                await window.authLogin(email, password);
            } else {
                // 如果 Firebase 未配置，显示提示
                alert('Firebase 配置尚未完成。请查看 auth.js 文件中的说明。');
            }
        } catch (error) {
            showError('loginPassword', error.message || '登录失败，请重试');
        } finally {
            hideLoading();
        }
    });

    // 注册表单提交
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearAllErrors();

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

        // 验证
        let hasError = false;

        if (!name) {
            showError('registerName', '请输入用户名');
            hasError = true;
        }

        if (!email) {
            showError('registerEmail', '请输入邮箱地址');
            hasError = true;
        } else if (!validateEmail(email)) {
            showError('registerEmail', '请输入有效的邮箱地址');
            hasError = true;
        }

        if (!password) {
            showError('registerPassword', '请输入密码');
            hasError = true;
        } else if (password.length < 6) {
            showError('registerPassword', '密码至少需要6个字符');
            hasError = true;
        }

        if (!passwordConfirm) {
            showError('registerPasswordConfirm', '请确认密码');
            hasError = true;
        } else if (password !== passwordConfirm) {
            showError('registerPasswordConfirm', '两次输入的密码不一致');
            hasError = true;
        }

        if (hasError) return;

        // 显示加载动画
        showLoading();

        try {
            // 调用 Firebase 注册 (在 auth.js 中定义)
            if (window.authRegister) {
                await window.authRegister(email, password, name);
            } else {
                // 如果 Firebase 未配置，显示提示
                alert('Firebase 配置尚未完成。请查看 auth.js 文件中的说明。');
            }
        } catch (error) {
            showError('registerPasswordConfirm', error.message || '注册失败，请重试');
        } finally {
            hideLoading();
        }
    });

    // Google 登录
    document.getElementById('googleLoginBtn').addEventListener('click', async function() {
        showLoading();
        try {
            if (window.authGoogleLogin) {
                await window.authGoogleLogin();
            } else {
                alert('Firebase 配置尚未完成。请查看 auth.js 文件中的说明。');
            }
        } catch (error) {
            alert(error.message || 'Google 登录失败');
        } finally {
            hideLoading();
        }
    });

    // GitHub 登录
    document.getElementById('githubLoginBtn').addEventListener('click', async function() {
        showLoading();
        try {
            if (window.authGithubLogin) {
                await window.authGithubLogin();
            } else {
                alert('Firebase 配置尚未完成。请查看 auth.js 文件中的说明。');
            }
        } catch (error) {
            alert(error.message || 'GitHub 登录失败');
        } finally {
            hideLoading();
        }
    });

    // 忘记密码
    document.getElementById('forgotPasswordLink').addEventListener('click', async function(e) {
        e.preventDefault();

        const email = prompt('请输入您的邮箱地址，我们将发送密码重置链接：');

        if (email && validateEmail(email)) {
            showLoading();
            try {
                if (window.authResetPassword) {
                    await window.authResetPassword(email);
                    alert('密码重置邮件已发送，请查收您的邮箱！');
                } else {
                    alert('Firebase 配置尚未完成。请查看 auth.js 文件中的说明。');
                }
            } catch (error) {
                alert(error.message || '发送重置邮件失败，请检查邮箱地址');
            } finally {
                hideLoading();
            }
        } else if (email) {
            alert('请输入有效的邮箱地址');
        }
    });

    // 加载动画控制
    function showLoading() {
        const loading = document.getElementById('loading');
        const submitBtns = document.querySelectorAll('.submit-btn');

        loading.classList.add('active');
        submitBtns.forEach(btn => btn.disabled = true);
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
    }

    function hideLoading() {
        const loading = document.getElementById('loading');
        const submitBtns = document.querySelectorAll('.submit-btn');
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;

        loading.classList.remove('active');
        submitBtns.forEach(btn => btn.disabled = false);

        if (activeTab === 'login') {
            loginForm.style.display = 'block';
        } else {
            registerForm.style.display = 'block';
        }
    }

    // 检查是否已登录
    if (window.authCheckLogin && window.authCheckLogin()) {
        // 如果已登录，重定向到个人中心
        window.location.href = 'profile.html';
    }
});
