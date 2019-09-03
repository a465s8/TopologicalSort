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
ResultTree.prototype.get_sort_result_list = function rec(graph_sort_result,tree_root){
   
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
    debugger
    var tepm_node = node;
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
            element.removed = false;
            element.adj_vexs.forEach(function(element){
                element.in_degree += 1;
            })
        }
    })
}

Graph.prototype.topo_sort = function rec(context,node){
    
    context.set_in_degree_o_vertexs(node);
    if(context.in_degree_0_vertexs.length>0){
        for(var i=0;i<context.in_degree_0_vertexs.length;i++){
            var vertex = context.in_degree_0_vertexs[i];
            var child = new ResultTreeNode(vertex);
            child.father = node;
            // var child = new Vertex(element.name);
            // child.father = node;
            // element.adj_vexs.forEach(function(element){
            //     child.adj_vexs.push(element);
            // })
            node.children.push(child);
        }
        node.children.forEach(function(element){
            rec(context,element);
        })
    }
}
function main(){
    var v1 = new Vertex('V1');
    var v2 = new Vertex('V2');
    var v3 = new Vertex('V3');
    var v4 = new Vertex('V4');
  
    var e1 = new Edge(v1,v2);
    var e2 = new Edge(v1,v3);
    var e3 = new Edge(v1,v4);
 

    var vertexs = [v1,v2,v3,v4]
    var edges = [e1,e2,e3]
    var g = new Graph(vertexs,edges);
    var t = new ResultTree();
    g.topo_sort(g,t.root);
    t.get_sort_result_list(g.sort_result,t.root);
    console.log(t.root);
}
main();