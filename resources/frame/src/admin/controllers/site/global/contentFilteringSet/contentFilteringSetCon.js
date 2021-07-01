/*
* 内容过滤设置
* */

import Card from '../../../../view/site/common/card/card';
import CardRow from '../../../../view/site/common/card/cardRow';
import TableContAdd from '../../../../view/site/common/table/tableContAdd';
import Page from '../../../../view/site/common/page/page';
import webDb from '../../../../../helpers/webDbHelper'
import appConfig from "../../../../../../config/appConfig";

export default {
  data: function () {
    let token = webDb.getLItem('Authorization');

    return {
      tableData: [],
      multipleSelection: [],
      tableDataLength: '',
      createCategoriesStatus: false,   //添加分类状态
      exportUrl: appConfig.baseUrl + '/api/backAdmin/stopWords/export',
      options: [
        {
          value: '{IGNORE}',
          label: '不处理'
        }, {
          value: '{MOD}',
          label: '审核'
        }, {
          value: '{BANNED}',
          label: '禁用'
        },
        {
          value: '{REPLACE}',
          label: '替换'
        }
      ],

      optionsUser: [
        {
          value: '{IGNORE}',
          label: '不处理'
        }, {
          value: '{BANNED}',
          label: '禁用'
        },
        // {
        //   value: '{MOD}',
        //   label: '审核'
        // }
      ],
      serachVal: '',
      checked: false,
      searchData: [],//搜索后的数据
      replace: true,
      inputFind: false,
      radio2: "1",
      total: 0, //总条数
      pageLimit: 20, //每页多少条
      pageNum: 1, //当前页
      userLoadMoreStatus: true,
      userLoadMorePageChange: false,
      deleteStatus: true,
      deleteList: [],
      tableAdd: false,

    }
  },
  created() {
    // this.handleSearchUser(true);  //初始化页面数据
    // this.pageNum  = Number(webDb.getLItem('currentPag'))||1;
    // this.handleSearchUser(Number(webDb.getLItem('currentPag'))||1);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name !== from.name && from.name !== null) {
        vm.getCreated(true)
      } else {
        vm.getCreated(false)
      }
    })
  },
  methods: {
    getCreated(state) {
      if (state) {
        this.pageNum = 1
      } else {
        this.pageNum = Number(webDb.getLItem('currentPag')) || 1;
      }
      this.handleSearchUser(true)

    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.deleteStatus = this.multipleSelection.length < 1;
    },

    onSearch(val) {
      this.searchVal = val;
      this.pageNum = 1;
      this.handleSearchUser(true);
    },
    async exportUrlContent() {
      try {
        const response = await this.appFetch({
          url: 'stopwords_export_v3',
          method: 'get',
          data: {
            'keyword': this.serachVal,
          }
        })
        const blob = new Blob([response], { type: 'application/x-xls' });
        const url = window.URL || window.webkitURL || window.moxURL;
        const downloadHref = url.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = downloadHref;
        a.download = 'stop-words.txt';
        a.click();
        a = null;
      } catch (err) {

      }
    },
    async handleSearchUser(initStatus = false) {
      try {
        const response = await this.appFetch({
          url: 'stopwords_get_v3',
          method: 'get',
          data: {
            'filter[keyword]': this.serachVal,
            "perPage": this.pageLimit,
            "page": this.pageNum
          }
        })
        if (response.errors) {
          this.$message.error(response.errors[0].code);
        } else {
          if (response.Code !== 0) {
            this.$message.error(response.Message);
            return
          }
          if (initStatus) {
            this.tableData = [];
          }
          const {Data: data} = response;
          this.tableData = this.tableData.concat(data.pageData).map((v) => {
            if (v.replacement === undefined) {
              v.replacement = '';
            }
            this.total = data.totalCount;
            return v;
          });
        }
      } catch (err) {

      } finally {
        this.userLoadMorePageChange = false;
      }
    },

    handleLoadMoreUser() {
      this.userLoadMorePageChange = true;
      this.handleSearchUser();
    },

    selectChange(scope) {
      if (scope) {
        if (scope.row.ugc !== '{REPLACE}' && scope.row.username !== '{REPLACE}') {
          this.tableData[scope.$index].replacement = '';
        }
      }
    },

    async loginStatus() {  //批量提交接口

      let result = this.tableData.filter((v) => {
        return v.addInputFlag;
      })

      result = result.concat(this.multipleSelection);

      try {
        if (this.tableData.length === 0) {
          return;
        }

        let words = [];

        for (let i = 0, len = this.tableData.length; i < len; i++) {
          const _data = this.tableData[i];
          const { ugc, username, signature, dialog, find, replacement } = _data;
          if (replacement === '' && ugc === '{REPLACE}' && username === '{REPLACE}') {
            continue;
          }
          let item = '';

          if (ugc === '{REPLACE}' && username === '{REPLACE}') {
            item = `${find}=${replacement}|`
          } else if (ugc === '{REPLACE}' && username !== '{REPLACE}') {
            item = `${find}=${replacement}|${username}`
          } else if (username === '{REPLACE}' && ugc !== '{REPLACE}') {
            item = `${find}=${replacement}|${ugc}`
          } else if (username !== '{REPLACE}' && ugc !== '{REPLACE}') {
            item = `${find}=${ugc}|${username}`
          }
          
          item += `|${signature}|${dialog}`;

          words.push(item);
        }

        if (words.length === 0) {
          return;
        }

        await this.appFetch({
          url: 'stopwords_batch_v3',
          method: 'post',
          standard: false,
          data: {
            "words": words,
            "overwrite": true
          }
        })
        this.handleSearchUser(true);
        this.$message({ message: '提交成功', type: 'success' });
      } catch (err) {
        console.error(err)
      }

    },
    tableContAdd() {
      this.tableData.push({
        find: "",
        username: "",
        ugc: "",
        replacement: "",
        addInputFlag: true,
      })
      this.tableAdd = true
    },
    deleteWords() {
      this.deleteList = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        this.deleteList.push(this.multipleSelection[i].id)
      }
      this.appFetch({
        url: 'stopwords_delete_v3',
        method: 'post',
        data: {
          'ids': this.deleteList.join(",")
        }
      }).then(res => {
        if (res.errors) {
          this.$message.error(res.errors[0].code);
        } else {
          if (res.Code !== 0) {
            this.$message.error(res.Message);
            return
          }
          this.handleSearchUser(true);
        }
      })

    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.handleSearchUser(true)
    }

  },
  components: {
    Card,
    CardRow,
    TableContAdd,
    Page
  }
}
