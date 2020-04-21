// app/controller/form.js
'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

function doShellCmd(cmd) {
  const str = cmd;
  const result = {};
  exec(str, function(err, stdout, stderr) {
    if (err) {
      console.log('命令行错误');
      result.errCode = 500;
      result.data = '操作失败！请重试';
    } else {
      console.log('stdout\n ', stdout);
      result.errCode = 200;
      result.data = '操作成功！';
      return;
    }
  });
}


class FormController extends Controller {
  async post() {
    const { ctx, service } = this;
    const body = this.ctx.request.body;
    console.log(body);
    ctx.body = { body };
    ctx.status = 200;
    const str = JSON.stringify(body);
    const cmd = 'ps -ef | grep ./keymanager | awk \' {print $2} \' | xargs kill -9\nscreen -d -r keymanager\n./keymanager\n';
    doShellCmd(cmd);
    fs.writeFile(path.resolve(__dirname, '../userppp.json'), str, function(err, data) {
      if (err) {
        console.error(err);
      }
      console.log('写入成功');
    });
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:7002/form',
      data: body,
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      console.log(res.data);
    });
  }
}
module.exports = FormController;
