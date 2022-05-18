import './init-wei-xin';

// 为 link 添加一些数据
const formatLink = link => {
  if (!link) return link;
  // 已经有了
  if (link.indexOf('p_mc') > -1) return link;

  const arrayByAnchor = link.split('#');
  const anchor = arrayByAnchor[1] || '';
  const arrayBySearch = arrayByAnchor[0].split('?');
  const pureUrl = arrayBySearch[0];
  const search = arrayBySearch[1];

  const paramToAdd = `search=1`;
  // 没有 ? #
  if (!anchor && !search) return `${pureUrl}?${paramToAdd}`;
  // 有 ? #
  if (anchor && search) return `${pureUrl}?${paramToAdd}&${search}#${anchor}`;
  // 有 ? 无 #
  if (search) return `${pureUrl}?${paramToAdd}&${search}`;
  // 无 ? 有 #
  if (anchor) return `${pureUrl}?${paramToAdd}#${anchor}`;

  return link;
};

/**
 * 初始化分享（适配微信和禅在）
 *
 * @param title 标题
 * @param desc 描述
 * @param link 链接
 * @param wxLink 微信端链接（如果没有，则取 link）
 * @param imgUrl 图片地址
 * @param success 成功回调（仅微信有效）
 * @param cancel 取消回调（仅微信有效）
 */
export default ({
  title,
  desc,
  link,
  wxLink,
  imgUrl,
  success,
  cancel,
}) => {
  // 不能超过100个字
  if (title && title.length > 100) title = title.slice(0, 100);
  if (desc && desc.length > 100) desc = desc.slice(0, 100);

  // 微信
  window.wx.ready(() => {
    window.wx.onMenuShareTimeline({
      title,
      link: formatLink(wxLink || link),
      imgUrl,
      success: () => {
        console.log('微信分享朋友圈成功');
        if (success) success();
      },
      cancel: () => {
        console.log('微信分享朋友圈失败');
        if (cancel) cancel();
      },
    });

    window.wx.onMenuShareAppMessage({
      title,
      desc,
      link: formatLink(wxLink || link),
      imgUrl,
      type: 'link',
      dataUrl: '',
      success: () => {
        console.log('微信分享好友成功');
        if (success) success();
      },
      cancel: () => {
        console.log('微信分享好友失败');
        if (cancel) cancel();
      },
    });
  });
};
