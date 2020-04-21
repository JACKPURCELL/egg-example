// app/controller/linknum.js
'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function doShellCmd(cmd, result) {
  const str = cmd;
  exec(str, function(err, stdout, stderr) {
    if (err) {
      console.log('命令行错误');
      result.errCode = 500;
      result.data = '操作失败！请重试';
    } else {
    //   console.log(stdout);
      result.errCode = 200;
      result.data = stdout;
      console.log('aaa');
      return;
    }
  });
}


class NumController extends Controller {
  async get() {
    const ctx = this.ctx;
    const result = await this.dolinkcheck();
    ctx.status = 200;
    // ctx.set(result.headers);
    ctx.body = result.data;
    console.log(result);
    console.log('bbb');
  }
  async dolinkcheck() {
    // const cmd = 'pstree -p `ps -e | grep keymanager | awk \'{print $1}\' | wc -l';
    // const cmd = 'ls';
    // const result = {};
    // await exec(cmd, function(err, stdout, stderr) {
    //   if (err) {
    //     console.log('命令行错误');
    //     result.errCode = 500;
    //     result.data = '操作失败！请重试';
    //   } else {
    //     //   console.log(stdout);
    //     result.errCode = 200;
    //     result.data = stdout;
    //     console.log('aaa');
    //   }
    // });
    // console(stdout);
    // console.log('ccc');
    // console.log(result.data);
    // return result;
    const { stdout, stderr } = await exec('ls');
    console.log('ccc');
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
    return stdout;
  }
}
module.exports = NumController;
