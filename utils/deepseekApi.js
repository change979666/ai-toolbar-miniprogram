/**
 * DeepSeek API 服务
 * 用于处理与DeepSeek AI API的通信
 */

// API配置
const API_CONFIG = {
  baseUrl: 'https://api.deepseek.com/v1/chat/completions',
  model: 'deepseek-chat', // 默认模型，根据实际可用模型调整
  apiKey: '' // API密钥需要从配置或安全存储中获取
};

/**
 * 发送聊天请求到DeepSeek API
 * @param {Array} messages - 消息历史记录数组，格式为[{role: 'user|assistant|system', content: '消息内容'}]
 * @param {Object} options - 可选配置参数
 * @returns {Promise} - 返回API响应的Promise
 */
export const sendChatRequest = async (messages, options = {}) => {
  // 获取API密钥（实际项目中应从安全存储获取）
  const apiKey = uni.getStorageSync('deepseek_api_key') || API_CONFIG.apiKey;
  
  if (!apiKey) {
    throw new Error('未设置API密钥，请在设置中配置DeepSeek API密钥');
  }
  
  // 确保消息格式正确
  const formattedMessages = messages.map(msg => {
    // 确保role是有效值：user, assistant, system
    const role = ['user', 'assistant', 'system'].includes(msg.role) ? msg.role : 'user';
    return {
      role: role,
      content: msg.content
    };
  });
  
  // 构建请求参数
  const requestData = {
    model: options.model || API_CONFIG.model,
    messages: formattedMessages,
    temperature: options.temperature !== undefined ? options.temperature : 0.7,
    max_tokens: options.max_tokens || 2000,
    stream: options.stream || false
  };
  
  // 添加可选参数
  if (options.top_p !== undefined) requestData.top_p = options.top_p;
  if (options.frequency_penalty !== undefined) requestData.frequency_penalty = options.frequency_penalty;
  if (options.presence_penalty !== undefined) requestData.presence_penalty = options.presence_penalty;
  
  try {
    console.log('发送请求到DeepSeek API:', JSON.stringify(requestData));
    
    // 发送请求到DeepSeek API
    const response = await uni.request({
      url: API_CONFIG.baseUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      data: requestData,
      timeout: 30000 // 30秒超时
    });
    
    // 检查响应状态
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('DeepSeek API响应:', JSON.stringify(response.data));
      return response.data;
    } else {
      const errorMsg = response.data && response.data.error ? 
        response.data.error.message || JSON.stringify(response.data) : 
        `状态码: ${response.statusCode}`;
      
      throw new Error(`API请求失败: ${errorMsg}`);
    }
  } catch (error) {
    console.error('DeepSeek API请求错误:', error);
    throw error;
  }
};

/**
 * 保存API密钥到本地存储
 * @param {String} apiKey - DeepSeek API密钥
 */
export const saveApiKey = (apiKey) => {
  uni.setStorageSync('deepseek_api_key', apiKey);
};

/**
 * 获取保存的API密钥
 * @returns {String} - 保存的API密钥
 */
export const getApiKey = () => {
  return uni.getStorageSync('deepseek_api_key') || '';
};

/**
 * 检查是否已设置API密钥
 * @returns {Boolean} - 是否已设置API密钥
 */
export const hasApiKey = () => {
  const key = getApiKey();
  return !!key;
};

export default {
  sendChatRequest,
  saveApiKey,
  getApiKey,
  hasApiKey
};