import React from 'react'
import classnames from 'classnames'
import styles from './banners.module.scss'

export const Banners = () => {
  const i18n = {
    t() {
      return '支持 Python 和 C++ 的 SDK 下載'
    }
  }

  return (
    <div className={classnames(styles['banners-container'])}>
      <div className={classnames(styles.banner)}>
        <div className="main-content">
          <div>
            <p className="title">SDK</p>
            <p className="desc">{i18n.t('zZUtQKodyN5_c1O3tJpTe')}</p>
            <div className="mt-8">
              <img
                className="w-[110px]"
                src="https://pub.lbkrs.com/files/202204/a6SQouve1tcwHphV/Group_627167.png"
                alt=""
              />
            </div>
          </div>
          <div>
            <img
              className="code-picture"
              src="https://pub.lbkrs.com/files/202204/iANK9jB2vYWW2tyN/Frame_3.png"
              alt=""
            />
            <img className="bracket" src="https://pub.lbkrs.com/files/202204/mspw6cx2Um4YYm3k/___1_.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
