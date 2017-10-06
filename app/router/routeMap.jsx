import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'



import Reception from '../containers/Reception'
import BackStage from '../containers/BackStage'


import Home from '../containers/Reception/Home'
import Store from '../containers/Reception/Store'
import Search from '../containers/Reception/Search'
import Detail from '../containers/Reception/Detail'



import ProductList from '../containers/BackStage/ProductList'
import AddProduct from '../containers/BackStage/AddProduct'


import NotFound from '../containers/404'


class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                {/*域名下默认页使用前台路由*/}
                <Route path='/' component={Reception}>
                    <IndexRoute component={Home}/>
                    <Route path='/store(/:id)' component={Store} />
                    <Route path='/search(/:keyword)' component={Search} />
                    <Route path='/detail/:id' component={Detail} />
                </Route>

                {/*后台管理页路由*/}
                <Route path='/admin' component={BackStage}>
                    <IndexRoute component={ProductList} />
                    <Route path='/admin/addProduct(/:id)' component={AddProduct} />
                </Route>

                {/*404页面*/}
                <Route path='*' component={NotFound}/>
            </Router>
        )
    }
}

export default RouterMap
