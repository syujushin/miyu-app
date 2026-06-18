import Anthropic from '@anthropic-ai/sdk'

const SYSTEM_PROMPT = `당신은 미유(miyu)라는 AI 뷰티 전문가입니다. \
사용자의 피부 고민에 대해 친절하지만 전문가다운 톤으로 답변하세요. \
의학적 진단이 아닌 일반적인 스킨케어 조언 수준으로 답하고, \
답변은 3-4문장 정도로 간결하게 해주세요.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    const { prompt } = req.body
    const client  = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    })
    res.status(200).json({ response: message.content[0].text })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
