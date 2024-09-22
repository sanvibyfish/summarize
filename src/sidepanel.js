let apiKey = '';
let converter = null;
let currentLanguage = 'en'; // 默认语言设置为英文

const translations = {
    en: {
        summarize: "Summarize",
        summary: "Summary",
        qa: "Q&A",
        collapse: "Collapse",
        expand: "Expand",
        question: "Enter your question",
        ask: "Ask",
        apiKeyPlaceholder: "Enter your Gemini API key",
        saveApiKey: "Save API Key",
        apiKeySaved: "API key saved",
        apiKeySaveError: "Failed to save API key, please try again",
        setApiKeyFirst: "Please set the API key first",
        gettingContent: "Getting page content...",
        summarizing: "Summarizing...",
        cantGetContent: "Unable to get page content, please refresh and try again.",
        summaryFailed: "Summary failed, please check your API key and network connection: ",
        thinking: "Thinking...",
        answerFailed: "Failed to answer, please check your API key and network connection: ",
        languageSelect: "Select language",
        apiKeyLabel: "API Key",
        languageName: "English",
        copy: "Copy",
        copied: "Copied!"
    },
    zh: {
        summarize: "总结",
        summary: "总结",
        qa: "问答",
        collapse: "收起",
        expand: "展开",
        question: "输入您的问题",
        ask: "提问",
        apiKeyPlaceholder: "输入您的Gemini API密钥",
        saveApiKey: "保存API密钥",
        apiKeySaved: "API密钥已保存",
        apiKeySaveError: "保存API密钥失败，请重试",
        setApiKeyFirst: "请先设置API密钥",
        gettingContent: "正在获取页面内容...",
        summarizing: "正在总结...",
        cantGetContent: "无法获取页面内容，请刷新页面后重试。",
        summaryFailed: "总结失败,请检查您的API密钥和网络连接: ",
        thinking: "正在思考...",
        answerFailed: "回答失败,请检查您的API密钥和网络连接: ",
        languageSelect: "选择语言",
        apiKeyLabel: "API密钥",
        languageName: "中文",
        copy: "复制",
        copied: "已复制！"
    },
    th: {
        summarize: "สรุป",
        summary: "บทสรุป",
        qa: "ถาม-ตอบ",
        collapse: "ย่อ",
        expand: "ขยาย",
        question: "ป้อนคำถามของคุณ",
        ask: "ถาม",
        apiKeyPlaceholder: "ป้อนคีย์ API Gemini ของคุณ",
        saveApiKey: "บันทึกคีย์ API",
        apiKeySaved: "บันทึกคีย์ API แล้ว",
        apiKeySaveError: "ไม่สามารถบันทึกคีย์ API โปรดลองอีกครั้ง",
        setApiKeyFirst: "โปรดตั้งค่าคีย์ API ก่อน",
        gettingContent: "กำลังดึงเนื้อหาหน้า...",
        summarizing: "กำลังสรุป...",
        cantGetContent: "ไม่สามารถดึงเนื้อหาหน้าได้ โปรดรีเฟรชและลองอีกครั้ง",
        summaryFailed: "การสรุปล้มเหลว โปรดตรวจสอบคีย์ API และการเชื่อมต่อเครือข่ายของคุณ: ",
        thinking: "กำลังคิด...",
        answerFailed: "ไม่สามารถตอบได้ โปรดตรวจสอบคีย์ API และการเชื่อมต่อเครือข่ายของคุณ: ",
        languageSelect: "เลือกภาษา",
        apiKeyLabel: "คีย์ API",
        languageName: "ไทย",
        copy: "คัดลอก",
        copied: "คัดลอกแล้ว!"
    },
    ko: {
        summarize: "요약",
        summary: "요약",
        qa: "질문 및 답변",
        collapse: "접기",
        expand: "펼치기",
        question: "질문을 입력하세요",
        ask: "질문하기",
        apiKeyPlaceholder: "Gemini API 키를 입력하세요",
        saveApiKey: "API 키 저장",
        apiKeySaved: "API 키가 저장되었습니다",
        apiKeySaveError: "API 키 저장에 실패했습니다. 다시 시도해 주세요",
        setApiKeyFirst: "먼저 API 키를 설정해 주세요",
        gettingContent: "페이지 내용을 가져오는 중...",
        summarizing: "요약 중...",
        cantGetContent: "페이지 내용을 가져올 수 없습니다. 페이지를 새로고침하고 다시 시도해 주세요.",
        summaryFailed: "요약 실패. API 키와 네트워크 연결을 확인해 주세요: ",
        thinking: "생각 중...",
        answerFailed: "답변 실패. API 키와 네트워크 연결을 확인해 주세요: ",
        languageSelect: "언어 선택",
        apiKeyLabel: "API 키",
        languageName: "한국어",
        copy: "복사",
        copied: "복사됨!"
    }
};

function updateLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('summarize-btn').textContent = translations[lang].summarize;
    document.getElementById('summary-header').textContent = translations[lang].summary;
    document.getElementById('qa-header').textContent = translations[lang].qa;
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.textContent = btn.textContent === translations[lang].collapse ? translations[lang].collapse : translations[lang].expand;
    });
    document.getElementById('question-input').placeholder = translations[lang].question;
    document.getElementById('ask-btn').textContent = translations[lang].ask;
    document.getElementById('api-key-input').placeholder = translations[lang].apiKeyPlaceholder;
    document.getElementById('save-api-key-btn').textContent = translations[lang].saveApiKey;
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.textContent = translations[lang].copy;
    });

    // 更新其他元素的文本
    document.getElementById('language-select').title = translations[lang].languageSelect;
    document.querySelector('label[for="api-key-input"]').textContent = translations[lang].apiKeyLabel;
}

function initializeShowdown() {
    if (typeof showdown !== 'undefined') {
        converter = new showdown.Converter({
            tables: true,
            tasklists: true,
            strikethrough: true,
            emoji: true
        });
        console.log('Showdown initialized successfully');
    } else {
        console.error('Showdown library not found');
    }
}

// 在文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeShowdown();
    const languageSelect = document.getElementById('language-select');
    const summarizeBtn = document.getElementById('summarize-btn');
    const summaryContainer = document.getElementById('summary-container');
    const questionInput = document.getElementById('question-input');
    const askBtn = document.getElementById('ask-btn');
    const answerContainer = document.getElementById('answer-container');
    const apiKeyInput = document.getElementById('api-key-input');
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');

    // 加载保存的语言设置
    chrome.storage.sync.get(['language', 'apiKey'], (result) => {
        if (result.language) {
            currentLanguage = result.language;
            languageSelect.value = currentLanguage;
        }
        if (result.apiKey) {
            apiKey = result.apiKey;
            apiKeyInput.value = apiKey;
        }
        updateLanguage(currentLanguage);
    });

    // 语言选择更改事件
    languageSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        chrome.storage.sync.set({ language: newLang }, () => {
            updateLanguage(newLang);
        });
    });

    // 保存API密钥
    saveApiKeyBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value;
        chrome.storage.sync.set({ apiKey: apiKey }, () => {
            if (chrome.runtime.lastError) {
                console.error('保存API密钥时出错:', chrome.runtime.lastError);
                alert(translations[currentLanguage].apiKeySaveError);
            } else {
                alert(translations[currentLanguage].apiKeySaved);
                console.log('API密钥已保存:', apiKey);
            }
        });
    });

    // 总结功能
    summarizeBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value;
        console.log('使用的API密钥:', apiKey);
        if (!apiKey) {
            alert(translations[currentLanguage].setApiKeyFirst);
            return;
        }
        summarizeBtn.disabled = true;
        summaryContainer.innerHTML = translations[currentLanguage].gettingContent;

        chrome.runtime.sendMessage({action: "getPageContent"}, (response) => {
            if (chrome.runtime.lastError) {
                console.error('发送消息时出错:', chrome.runtime.lastError);
                summaryContainer.innerHTML = translations[currentLanguage].cantGetContent + JSON.stringify(chrome.runtime.lastError);
                summarizeBtn.disabled = false;
                return;
            }
            if (response && response.content) {
                summaryContainer.innerHTML = translations[currentLanguage].summarizing;
                summarizeContent(response.content, currentLanguage);
            } else if (response && response.error) {
                console.error('获取内容时出错:', response.error);
                summaryContainer.innerHTML = translations[currentLanguage].cantGetContent + response.error;
                summarizeBtn.disabled = false;
            } else {
                console.error('未收到有效的响应:', response);
                summaryContainer.innerHTML = translations[currentLanguage].cantGetContent;
                summarizeBtn.disabled = false;
            }
        });
    });

    // 提问功能
    askBtn.addEventListener('click', () => {
        apiKey = apiKeyInput.value;
        console.log('使用的API密钥:', apiKey);
        if (!apiKey) {
            alert(translations[currentLanguage].setApiKeyFirst);
            return;
        }
        const question = questionInput.value;
        if (question) {
            answerContainer.innerHTML = translations[currentLanguage].thinking;
            askQuestion(question);
        }
    });

    // 添加收缩功能
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            targetElement.classList.toggle('collapsed');
            button.textContent = targetElement.classList.contains('collapsed') ? translations[currentLanguage].expand : translations[currentLanguage].collapse;
        });
    });

    // 添加复制功能
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            const textToCopy = targetElement.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = translations[currentLanguage].copied;
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});

function renderMarkdown(content, containerId) {
    const container = document.getElementById(containerId);
    if (!converter) {
        console.warn('Showdown 尚未初始化，正在尝试初始化...');
        initializeShowdown();
    }
    
    if (converter) {
        try {
            const html = converter.makeHtml(content);
            container.innerHTML = html;
            console.log('Markdown 渲染成功');
            // 对代码块应用 highlight.js
            container.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });
            // 为表格添加类
            container.querySelectorAll('table').forEach((table) => {
                table.classList.add('markdown-table');
            });
        } catch (error) {
            console.error('Markdown 渲染错误:', error);
            container.textContent = content;
        }
    } else {
        console.error('Showdown 转换器不可用，显示纯文本内容');
        container.textContent = content;
    }
}

async function summarizeContent(content, language) {
    console.log('开始总结，使用的API密钥:', apiKey);
    const prompt = `Summarize the following content in ${translations[language].languageName}, highlighting the core ideas and key information. The summary should not exceed 20% of the original text length. Use concise Markdown format, mainly using ## and ### level headings, and appropriate use of bold, italic, and short lists:\n\n${content}`;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API响应:', data);

        if (data.error) {
            throw new Error(data.error.message || 'Unknown API error');
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
            throw new Error('Unexpected API response structure');
        }

        const summary = data.candidates[0].content.parts[0].text;
        renderMarkdown(summary, 'summary-container');
        document.getElementById('summarize-btn').disabled = false;
        chrome.storage.local.set({ lastSummary: summary });
    } catch (error) {
        console.error('总结出错:', error);
        document.getElementById('summary-container').textContent = translations[currentLanguage].summaryFailed + error.message;
        document.getElementById('summarize-btn').disabled = false;
    }
}

async function askQuestion(question) {
    console.log('开始提问，使用的API密钥:', apiKey);
    const prompt = `Based on the following summary, answer the question concisely and directly in ${translations[currentLanguage].languageName}, focusing on the key points and avoiding overly detailed or off-topic explanations. Use the same concise Markdown format as the summary:\n\n${document.getElementById('summary-container').textContent}\n\nQuestion: ${question}`;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{parts: [{text: prompt}]}]
            })
        });

        const data = await response.json();
        console.log('API响应:', data);
        if (data.error) {
            throw new Error(data.error.message);
        }
        const answer = data.candidates[0].content.parts[0].text;
        
        renderMarkdown(answer, 'answer-container');
    } catch (error) {
        console.error('回答问题出错:', error);
        document.getElementById('answer-container').textContent = translations[currentLanguage].answerFailed + error.message;
    }
}