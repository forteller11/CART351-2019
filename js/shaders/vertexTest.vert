// an attribute will receive data from a buffer
 attribute vec2 a_position;
varying vec4 a_color;
 // all shaders have a main function
 void main() {

   // gl_Position is a special variable a vertex shader
   // is responsible for setting
   vec4 normalise = (1, 1, 1, 0);
   gl_Position = a_position;
   a_color = (a_position + normalise )/2;

 }
