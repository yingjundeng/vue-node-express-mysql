<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
	
	
	<!-- <div class="sidebar">
	    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
	        text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
	        <template v-for="item in itemList">
	            <template v-if="item.menuList">
	                <el-submenu :index="item.component" :key="item.component">
	                    <template slot="title">
	                        <i :class="item.menuId"></i><span slot="title">{{ item.menuName }}</span>
	                    </template>
	                    <template v-for="subItem in item.menuList">
	                        <!-- <el-submenu v-if="subItem.menuList" :index="subItem.component" :key="subItem.component">
	                            <template slot="title">{{ subItem.menuName }}</template>
	                            <el-menu-item v-for="(threeItem,i) in subItem.menuList" :key="i" :index="threeItem.component">
	                                {{ threeItem.menuName }}
	                            </el-menu-item>
	                        </el-submenu> 
	                        <el-menu-item  :index="subItem.component" :key="subItem.component">
	                            {{ subItem.menuName }}
	                        </el-menu-item>
	                    </template>
	                </el-submenu>
	            </template>
	            <template v-else>
	                <el-menu-item :index="item.component" :key="item.component">
	                    <i :class="item.menuId"></i><span slot="title">{{ item.menuName }}</span>
	                </el-menu-item>
	            </template>
	        </template>
	    </el-menu>
	</div> -->
</template>

<script>
    import bus from '../public/bus';
    export default {
        data() {
            return {
                collapse: false,
				itemList:[],
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '数据概况',
						subs: [
						    {
						        index: 'libcontent',
						        title: '业绩数据'
						    },
						    {
						        index: 'chuku',
						        title: '用户信息',
						    },
						    {
						        index: 'storesGoods',
						        title: '商家信息'
						    },
							{
							    index: 'onlineStore',
							    title: '订单详情'
							}
						]
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '业绩奖励明细',
						subs: [
						    {
						        index: 'Userbonus',
						        title: '用户奖励金明细'
						    },
						    {
						        index: 'areaUser',
						        title: '区域专员明细',
						    },
						]
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'tabs',
                        title: '资源库管理',
						subs: [
						    {
						        index: 'resourcesList',
						        title: '资源创建'
						    },
						    {
						        index: 'goodsOnline',
						        title: '商品待审',
						    },
						    {
						        index: 'submissionAudit',
						        title: '上线商品'
						    }
						]
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '商家管理',
                        subs: [
                            {
                                index: 'dataGeneralsituation',
                                title: '商家审核'
                            },
                            {
                                index: 'management',
                                title: '商家审核历史',
                            },
                            {
                                index: 'merchants',
                                title: '商家管理'
                            }
                        ]
                    },
					
					
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'icon',
                        title: '财务管理',
						subs: [
						    {
						        index: 'business',
						        title: '营业数据'
						    },
						    {
						        index: 'withdrawal',
						        title: '商家业绩与奖励金提现',
						    },
						    {
						        index: 'withdrawalRecord',
						        title: '商家业绩与奖励金提现记录'
						    }
						]
                    },
					
					
                    {
                        icon: 'el-icon-lx-favor',
                        index: 'charts',
                        title: '用户专员管理',
						subs: [
						    {
						        index: 'UserSetting',
						        title: '用户设置'
						    },
						    {
						        index: 'establish',
						        title: '创建专员',
						    },
						    {
						        index: 'history',
						        title: '创建专员历史'
						    },
							{
							    index: 'district',
							    title: '区域专员设置'
							}
						]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: 'drag',
                        title: '社区管理',
						subs: [
						    {
						        index: 'communityList',
						        title: '社区列表'
						    },
						]
                    },
					
                    {
                        icon: 'el-icon-lx-warn',
                        index: '6',
                        title: '权限管理',
                        subs: [
                            {
                                index: 'roleMagement',
                                title: '角色管理'
                            },
                            {
                                index: 'userMagement',
                                title: '用户管理'
                            },
							{
							    index: 'addpermissions',
							    title: '菜单管理'
							},
							{
							    index: 'changepermissions',
							    title: '权限管理'
							}
                        ]
                    },
					{
					    icon: 'el-icon-setting',
					    index: '7',
					    title: '系统设置',
					    subs: [
					        {
					            index: 'version',
					            title: 'app版本控制'
					        },
					    ]
					}
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
			this.itemList = JSON.parse(sessionStorage.getItem("menu"))
			console.log(JSON.parse(sessionStorage.getItem("menu")))
			console.log(this.items)
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
