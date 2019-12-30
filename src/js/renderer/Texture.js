export default class Texture {
	constructor(renderer, params) {
		this.gl = renderer.gl;
		this.ext = renderer.extensions;

		this.url = params.url;
		this.anisotropy = params.anisotropy || 1;
		this.minFilter = params.minFilter || 'LINEAR_MIPMAP_LINEAR';
		this.magFilter = params.magFilter || 'LINEAR';
		this.wrap = params.wrap || 'repeat';
		this.sizeX = params.sizeX || 1;
		this.sizeY = params.sizeY || 1;
		this.format = params.format || 'RGBA';
		this.internalFormat = params.internalFormat || 'RGBA';
		this.type = params.type || 'UNSIGNED_BYTE';

		this.WebGLTexture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.WebGLTexture);

		if(this.url) {
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl[this.minFilter]);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl[this.magFilter]);
			this.gl.generateMipmap(this.gl.TEXTURE_2D);
			this.gl.texParameterf(this.gl.TEXTURE_2D, this.ext.texture_filter_anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropy);
			this.updateWrapping();
			this.load();
		} else {
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl[this.internalFormat], this.sizeX, this.sizeY, 0, this.gl[this.format], this.gl[this.type], null);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl[this.minFilter]);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl[this.magFilter]);
		}
	}

	load() {
		const image = new Image();

		image.onload = function() {
			this.gl.bindTexture(this.gl.TEXTURE_2D, this.WebGLTexture);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, image.width, image.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
			this.gl.generateMipmap(this.gl.TEXTURE_2D);
		}.bind(this);

		image.src = this.url;
	}

	updateWrapping() {
		let value = null;

		switch(this.wrap) {
			case 'repeat':
				value = this.gl.REPEAT;
				break;
			case 'clamp':
				value = this.gl.CLAMP_TO_EDGE;
				break;
		}

		if(value) {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, value);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, value);
		}
	}
}