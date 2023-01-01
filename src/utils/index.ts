/**
 * 随机获取min 到max之间的随机整数
 * @param max
 * @param min
 */
export const getRandom = (max: number, min: number): number => {
    return Math.floor(Math.random()*(max - min) + min);
}