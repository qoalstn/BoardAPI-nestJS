'use strict';

import { HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import * as moment from 'moment';
import * as fs from 'fs';
import { join } from 'path';

export const imageFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return '이미지 파일이 아닙니다..'
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname);
  const date = String(moment().format('hhmmss'));
  const mem = req.user_id ? String(req.user_id) : 0;

  callback(null, `${date}${mem}${fileExtName}`);
};
