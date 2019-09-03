  //顶点
function Vertex(name) {
    this.in_degree = 0;
    this.name =name;
    this.adj_vexs = [];
}
  //边
function Edge(vertex,adj_vex){
    this.vertex = vertex;
    this.vertex.adj_vexs.push(adj_vex);

    this.adj_vex = adj_vex;
    this.adj_vex.in_degree += 1;
}
  //图
function Graph(vertexs,edges){
    this.vertexs = vertexs;
    this.edges = edges;

    this.in_degree_0_vertexs = [];
    this.sort_result = {last_key:0,0:[]};
}
Graph.prototype.init = function (){
    var that = this;
    this.vertexs.forEach(function(element){
        if(element.in_degree===0){
            that.in_degree_0_vertexs.push(element);
        }
    })
}

Graph.prototype.topo_sort = function ts(context){
    if(context.vertexs.length>0){
        if(context.in_degree_0_vertexs.length===0){
            context.sort_result.last_key = -1;
            return ;
        }
        context.in_degree_0_vertexs.forEach( function(element,index) {

            var last_key = context.sort_result.last_key;
            context.sort_result[last_key].push(element);

            context.in_degree_0_vertexs.splice(index,1);
            
            var i = context.vertexs.indexOf(element);
            context.vertexs.splice(i,1);

            element.adj_vexs.forEach(function(el){
                el.in_degree -= 1;
                if(el.in_degree === 0){
                    context.in_degree_0_vertexs.push(el);
                }
            });
        });
        ts(context);
    }
}
Graph.prototype.output = function(){
    if(this.sort_result.last_key!=-1){
        for (var key in this.sort_result) {
            if (this.sort_result.hasOwnProperty(key) && key!='last_key') {
                const element = this.sort_result[key];
                console.log(element);
            }
        }
    }
    else{
        console.log('not Directed Acyclic Graph（DAG）')
    }
}


// var v1 = new Vertex('V1');
// var v2 = new Vertex('V2');
// var v3 = new Vertex('V3');
// var v4 = new Vertex('V4');
// var v5 = new Vertex('V5');

// var e1 = new Edge(v1,v2);
// var e2 = new Edge(v1,v3);
// var e3 = new Edge(v1,v4);
// var e4 = new Edge(v2,v4);
// var e5 = new Edge(v4,v3);
// var e6 = new Edge(v5,v4);

// var vertexs = [v1,v2,v3,v4,v5];
// var edges = [e1,e2,e3,e4,e5,e6];
// var g = new Graph(vertexs,edges);
// g.init();
// g.topo_sort(g);
// g.output();
