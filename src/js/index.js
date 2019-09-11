//顶点
function Vertex(name) {
    this.in_degree = 0;
    this.name =name;
    
    this.adj_vexs = [];
    // this.children = [];

    // this.father = null;
    this.removed = false;
}
  //边
function Edge(vertex,adj_vex){
    this.vertex = vertex;
    this.vertex.adj_vexs.push(adj_vex);

    this.adj_vex = adj_vex;
    this.adj_vex.in_degree += 1;
    // this.adj_vex.father = vertex;
}
function ResultTreeNode(vertex){
    this.name = vertex.name;
    this.vertex = vertex;
    this.father = null;
    this.children = [];
}

function ResultTree(){
    var root_vertex = new Vertex('root');
    this.root = new ResultTreeNode(root_vertex);
    this.root.father = null;
}

  //图
function Graph(vertexs,edges){
    this.vertexs = vertexs;
    this.edges = edges;

    this.in_degree_0_vertexs = [];

    // var that = this;
    // this.vertexs.forEach(function(element){
    //     if(element.in_degree===0){
    //         that.in_degree_0_vertexs.push(element);
    //     }
    // })
    this.sort_result = {last_key:0,0:[]};
}
Graph.prototype.set_in_degree_o_vertexs=function(node){
    var flag = true;
    var removed_count = 0;
    while(node.father!=null){
        node.vertex.removed = true;
        node.vertex.adj_vexs.forEach(function(element){
            element.in_degree -= 1;
        });
        node = node.father;
    }

    var that = this;
    this.in_degree_0_vertexs = [];
    this.vertexs.forEach(function(element){
        if(!element.removed && element.in_degree===0 ){
            that.in_degree_0_vertexs.push(element);
        }
    })

    this.vertexs.forEach(function(element){
        if(element.removed){
            removed_count +=1;
            element.removed = false;
            element.adj_vexs.forEach(function(element){
                element.in_degree += 1;
            })
        }
    })
    if(removed_count<this.vertexs.length && this.in_degree_0_vertexs.length===0){
        flag = false;
    }
    return flag;
}

Graph.prototype.update_result = function rec(last_result,node){
    if(node.father!=null){
        last_result.unshift(node.vertex);
        rec(last_result,node.father);
    }
}

Graph.prototype.topo_sort = function rec(context,node,max){
    //checkNode(node);
    console.log(max,context.sort_result.last_key)
    if(context.sort_result.last_key>max){
        return;
    }
    var isDGA=context.set_in_degree_o_vertexs(node);
    if(isDGA && context.sort_result.last_key!=-1){
        if(context.in_degree_0_vertexs.length>0){
            for(var i=0;i<context.in_degree_0_vertexs.length;i++){
                var vertex = context.in_degree_0_vertexs[i];
                var child = new ResultTreeNode(vertex);
                child.father = node;
                node.children.push(child);
            }
            node.children.forEach(function(element){
                rec(context,element,max);
            })
        }else{
            var last_key = context.sort_result.last_key;
            context.sort_result[last_key] = [];
            context.update_result(context.sort_result[last_key],node);
            context.sort_result.last_key += 1;
            return;
        }
    }else{
        context.sort_result.last_key = -1;
        return;
    }
    
}
Graph.prototype.draw_results = function(element){
    if(this.sort_result.last_key!=-1){
        for(let key = 0;key<this.sort_result.last_key ;key++){
            var graph_str =  'digraph graphname{' + this.sort_result[key][0].name; 
            for(var i=1;i<this.sort_result[key].length;i++){
                graph_str = graph_str  + ' -> '+this.sort_result[key][i].name ;
            }
            graph_str += ';}';
            console.log(graph_str);
            var viz = new Viz();
            viz.renderSVGElement(graph_str)
            .then(function(graph) {
                var graphindex=0;
				 graphindex="_"+JSON.parse(JSON.stringify(key));
                var div = document.createElement('div');
				//div.id="sort"+""+graphindex+"";
				graph.id="sort"+""+graphindex+"";
				
				div.align="center";
                // div.style.border='2px dashed black';
               // div.style = 'height: 150px;width: 150px; border: 1px solid #777;';
                div.appendChild(graph);
				var button=document.createElement("Button");
				button.name="sort"+""+graphindex+"";
				button.setAttribute("onclick", "javascript:change($(this).attr('name'));");
                button.style='display:block;';
                button.className='btn btn-dark'
				button.innerText="导出";
                div.appendChild(button);
                element.appendChild(div);
            })
            .catch(error => {
                viz = new Viz();
                console.error(error);
            });
        }
        return true;
    }else{
        // window.alert('输入的不是有向n五环图');
        return false;
    }
}
function test(){
    var v1 = new Vertex('微积分B1');
    var v2 = new Vertex('线性代数');
    var v3 = new Vertex('微积分B2');
    var v4 = new Vertex('离散数学');
    var v5 = new Vertex('计算机科学导论');
    var v6 = new Vertex('程序设计基础');
    var v7 = new Vertex('高等微积分');
    
  
    var v8 = new Vertex('概率论与数理统计');
    var v9 = new Vertex('数字逻辑');
    var v10 = new Vertex('面向对象程序设计');
    var v11 = new Vertex('计算机组织与体系结构');
    var v12 = new Vertex('数据结构与算法');
    var v13 = new Vertex('计算机图形学');
    var v14 = new Vertex('操作系统原理');
    var v15 = new Vertex('数据库原理');
    var v16 = new Vertex('编译原理');
    var v17 = new Vertex('计算机网络');
    var v18 = new Vertex('软件工程');
    var v19 = new Vertex('智能系统');
    // var v5 = new Vertex('V5');
  
    var e1 = new Edge(v1,v3);
    // var e2 = new Edge(v1,v4);
    // var e3 = new Edge(v2,v4);
    // var e4 = new Edge(v3,v7);
    // var e5 = new Edge(v3,v8);
    // var e6 = new Edge(v4,v9);
    // var e7 = new Edge(v5,v9);
    // var e8 = new Edge(v6,v9);
    // var e9 = new Edge(v5,v10);
    // var e10 = new Edge(v6,v10);
    // var e11 = new Edge(v9,v11);
    // var e12 = new Edge(v10,v12);
    // var e13 = new Edge(v10,v13);
    // var e14 = new Edge(v12,v14);
    // var e15 = new Edge(v12,v15);
    // var e16 = new Edge(v12,v16);
    // var e17 = new Edge(v12,v17);
    // var e18 = new Edge(v12,v18);
    // var e19 = new Edge(v12,v19);
    // var e4 = new Edge(v2,v5);  
    // var e5 = new Edge(v3,v4);
 

    var vertexs = [v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19];
    var edges = [e1];
    var g = new Graph(vertexs,edges);
    var t = new ResultTree();
    g.topo_sort(g,t.root);
    // t.get_sort_result_list(g.sort_result,t.root);
    // console.log(g.sort_result);
}
 //test();
