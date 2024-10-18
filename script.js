document.addEventListener("alpine:init", () => {
  Alpine.data("mainData", () => ({
    darkMode: localStorage.getItem("theme") === "dark",
    showAbout: false,
    init() {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        this.darkMode = true;
      } else {
        document.documentElement.classList.remove("dark");
        this.darkMode = false;
      }
      this.$nextTick(() => {
        this.initParticleBackground();
      });
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      localStorage.theme = this.darkMode ? "dark" : "light";
      document.documentElement.classList.toggle("dark", this.darkMode);
      this.$nextTick(() => {
        this.updateParticleColor();
      });
    },
    toggleAbout() {
      this.showAbout = !this.showAbout;
    },
    initParticleBackground() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("particle-bg"),
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      const particles = new THREE.BufferGeometry();
      const particleCount = 5000;
      const posArray = new Float32Array(particleCount * 3);
      const colorArray = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 5;
        posArray[i + 1] = (Math.random() - 0.5) * 5;
        posArray[i + 2] = (Math.random() - 0.5) * 5;

        colorArray[i] = Math.random();
        colorArray[i + 1] = Math.random();
        colorArray[i + 2] = Math.random();
      }

      particles.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      particles.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

      const material = new THREE.PointsMaterial({
        size: 0.005,
        vertexColors: true,
      });

      const particlesMesh = new THREE.Points(particles, material);
      scene.add(particlesMesh);

      camera.position.z = 2;

      let mouseX = 0;
      let mouseY = 0;

      document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
      });

      const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += mouseY * 0.001;
        particlesMesh.rotation.y += mouseX * 0.001;

        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      this.updateParticleColor = () => {
        const colors = particles.attributes.color;
        for (let i = 0; i < particleCount * 3; i += 3) {
          if (this.darkMode) {
            colors.setXYZ(i / 3, 1, 1, 1); // White for dark mode
          } else {
            // Pastel colors for light mode
            colors.setXYZ(
              i / 3,
              0.5 + Math.random() * 0.5,
              0.5 + Math.random() * 0.5,
              0.5 + Math.random() * 0.5
            );
          }
        }
        colors.needsUpdate = true;
      };

      this.updateParticleColor(); // Initial color set
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.showToast();
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    },
    showToast() {
      const toast = document.getElementById("toast");
      toast.className = "show";
      setTimeout(() => {
        toast.className = toast.className.replace("show", "");
      }, 3000);
    },
    focusCard(isFocused) {
      const bg = document.getElementById("particle-bg");
      if (isFocused) {
        bg.classList.add("active");
      } else {
        bg.classList.remove("active");
      }
    },
  }));
});
