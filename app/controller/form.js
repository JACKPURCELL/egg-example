// app/controller/form.js
'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
class FormController extends Controller {
  async post() {
    const { ctx, service } = this;
    const body = this.ctx.request.body;
    console.log(body);
    ctx.body = { body };
    ctx.status = 200;
    const str = JSON.stringify(body);
    fs.writeFile(path.resolve(__dirname, '../userppp.json'), str, function(err, data) {
      if (err) {
        console.error(err);
      }
      console.log('写入成功');
    });
  }
}
module.exports = FormController;
