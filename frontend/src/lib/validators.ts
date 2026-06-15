const PROHIBITED_WORDS = ['习近平', '胡锦涛', '毛泽东', '江泽民', '操你妈', '共产党', '六四', '法轮功', '卖淫', '嫖娼', '吸毒', '毒品', '白粉', '海洛因', '赌博', '网贷', '翻墙'];

export function hasProhibitedContent(text: string): string | null {
	for (const word of PROHIBITED_WORDS) {
		if (text.includes(word)) return `内容包含违禁词: ${word}`;
	}
	return null;
}

export function hasInvisibleCharacters(str: string) {
	return /[\u200B-\u200F\uFEFF\u2028\u2029\u180E\u3164\u115F\u1160]/.test(str);
}

export function hasControlCharacters(str: string) {
	return /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(str);
}

export function isVisuallyEmpty(str: string) {
	if (!str) return true;
	const stripped = str.replace(/[\s\u200B-\u200F\uFEFF\u2028\u2029\u180E\u3164\u115F\u1160\x00-\x1F\x7F]+/g, '');
	return stripped.length === 0;
}

export function validateText(str: string, label: string) {
	if (!str) return `${label}不能为空`;
	if (isVisuallyEmpty(str)) return `${label}不能为空（包含不可见字符）`;
	if (hasInvisibleCharacters(str)) return `${label}包含非法隐形字符`;
	if (hasControlCharacters(str)) return `${label}包含非法控制字符`;
	const prohibited = hasProhibitedContent(str);
	if (prohibited) return prohibited;
	return null;
}

