export interface TemplatePartialData {
  // 特殊的标示，用于表示这是部分数据而不是完整的对象
  isPartialData: true
}

export type TemplateFullData<T extends TemplatePartialData> = Omit<
  T,
  'isPartialData'
> & {
  // 如果存在这个标示，则必须为 false，用于强制类型提示 PartialData 和 FullData 的区别
  isPartialData?: false
}
