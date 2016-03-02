var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(Cube1rotation, Cube2rotation, Cube3rotation, Cube4rotation, Cube5rotation) {
            this.Cube1rotation = Cube1rotation;
            this.Cube2rotation = Cube2rotation;
            this.Cube3rotation = Cube3rotation;
            this.Cube4rotation = Cube4rotation;
            this.Cube5rotation = Cube5rotation;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map