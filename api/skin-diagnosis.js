import OpenAI from 'openai'

const PROMPT = `이 얼굴 사진을 보고 피부 상태를 AI로 분석하세요. 사진에서 관찰 가능한 피부 특징(피부톤, 광택, 모공, 트러블 등)을 실제로 반영해 매번 다른 결과를 생성하세요.

아래 JSON 형식으로만 응답하세요 (코드블록·추가 텍스트 없이):
{
  "skin_type": "피부 타입 설명 (예: 수분 부족형 복합성 민감 피부)",
  "score": 55~88 사이 정수,
  "tags": ["특징 태그 1", "특징 태그 2", "특징 태그 3"],
  "moisture": 25~72 사이 정수,
  "sebum": 38~78 사이 정수,
  "elasticity": 42~82 사이 정수,
  "comment": "현재 T존·U존 등 구체적인 피부 상태 핵심 요약 (1~2문장, 줄바꿈 포함 가능)",
  "analysis": [
    "이 사용자의 피부 상태 원인 분석 문장",
    "개선을 위한 구체적인 생활 케어 조언 문장"
  ]
}`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })
  try {
    const { imageDataUrl } = req.body
    if (!imageDataUrl) return res.status(400).json({ error: 'imageDataUrl required' })

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: imageDataUrl, detail: 'low' } },
            { type: 'text', text: PROMPT },
          ],
        },
      ],
      max_tokens: 512,
      response_format: { type: 'json_object' },
    })

    const raw = completion.choices[0].message.content
    const data = JSON.parse(raw)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
