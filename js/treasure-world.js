/**
 * Cookie Treasure World - Interactive JavaScript
 * Handles recipe cards, modal interactions, and timeline animations
 */

class TreasureWorld {
    constructor() {
        this.currentRecipe = null;
        this.recipeData = this.initializeRecipeData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupModalInteractions();
        this.setupTimelineNavigation();
    }

    setupEventListeners() {
        // Recipe card clicks
        const recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const recipeType = card.dataset.recipe;
                this.openRecipeModal(recipeType);
            });
        });

        // Explore buttons
        const exploreButtons = document.querySelectorAll('.btn-explore');
        exploreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const recipeType = button.dataset.recipe;
                this.openRecipeModal(recipeType);
            });
        });

        // Color-themed hover effects
        this.setupColorHoverEffects();
    }

    setupColorHoverEffects() {
        const cards = document.querySelectorAll('.recipe-card');
        cards.forEach(card => {
            const color = card.dataset.color;
            
            card.addEventListener('mouseenter', () => {
                card.style.setProperty('--hover-color', color);
                card.style.borderColor = color;
            });

            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'transparent';
            });
        });
    }

    setupModalInteractions() {
        const modal = document.getElementById('recipe-modal');
        const closeBtn = document.getElementById('modal-close');
        const modalBackground = modal.querySelector('.modal-background');

        // Close modal
        closeBtn.addEventListener('click', () => this.closeRecipeModal());
        modalBackground.addEventListener('click', () => this.closeRecipeModal());
        
        // Close with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeRecipeModal();
            }
        });
    }

    setupTimelineNavigation() {
        const timelineButtons = document.querySelectorAll('.timeline-btn');
        timelineButtons.forEach(button => {
            button.addEventListener('click', () => {
                const stage = button.dataset.stage;
                this.switchTimelineStage(stage);
            });
        });
    }

    openRecipeModal(recipeType) {
        const modal = document.getElementById('recipe-modal');
        const recipe = this.recipeData[recipeType];
        
        if (!recipe) return;

        this.currentRecipe = recipeType;
        this.populateModalContent(recipe);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset to first timeline stage
        this.switchTimelineStage('1');
    }

    closeRecipeModal() {
        const modal = document.getElementById('recipe-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentRecipe = null;
    }

    populateModalContent(recipe) {
        // Update modal header and basic info
        document.getElementById('modal-recipe-title').textContent = recipe.title;
        document.getElementById('modal-recipe-image').src = recipe.image;
        document.getElementById('modal-recipe-image').alt = recipe.title;
        document.getElementById('modal-recipe-story').textContent = recipe.story;
        document.getElementById('modal-prep-time').textContent = recipe.prepTime;
        document.getElementById('modal-difficulty').textContent = recipe.difficulty;

        // Update timeline content
        this.populateTimelineContent(recipe);

        // Update modal header color
        const modalHeader = document.querySelector('.modal-header');
        modalHeader.style.background = `linear-gradient(135deg, ${recipe.color}, ${this.darkenColor(recipe.color, 0.2)})`;
    }

    populateTimelineContent(recipe) {
        // Stage 1: Ingredients
        const ingredientsList = document.getElementById('ingredients-list');
        ingredientsList.innerHTML = recipe.ingredients.map(ingredient => 
            `<li>${ingredient}</li>`
        ).join('');

        // Stage 2: Dough steps
        const doughSteps = document.getElementById('dough-steps');
        doughSteps.innerHTML = recipe.doughSteps.map(step => 
            `<li>${step}</li>`
        ).join('');

        // Stage 3: Baking steps
        const bakingSteps = document.getElementById('baking-steps');
        bakingSteps.innerHTML = recipe.bakingSteps.map(step => 
            `<li>${step}</li>`
        ).join('');

        // Stage 4: Enjoying tips
        const enjoyingTips = document.getElementById('enjoying-tips');
        enjoyingTips.innerHTML = recipe.enjoyingTips.map(tip => 
            `<li>${tip}</li>`
        ).join('');
    }

    switchTimelineStage(stageNumber) {
        // Update button states
        const buttons = document.querySelectorAll('.timeline-btn');
        const stages = document.querySelectorAll('.timeline-stage');

        buttons.forEach(btn => btn.classList.remove('active'));
        stages.forEach(stage => stage.classList.remove('active'));

        // Activate selected stage
        const activeButton = document.querySelector(`[data-stage="${stageNumber}"]`);
        const activeStage = document.getElementById(`stage-${stageNumber}`);

        if (activeButton && activeStage) {
            activeButton.classList.add('active');
            activeStage.classList.add('active');
        }
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent * 100);
        const R = (num >> 16) - amt;
        const B = (num >> 8 & 0x00FF) - amt;
        const G = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + 
                      (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + 
                      (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    }

    initializeRecipeData() {
        return {
            butter: {
                title: "Premium Butter Cookies",
                image: "img/recipe-butter-cookies.jpg",
                story: "The crown jewel of Forever Cookie - our signature Premium Butter Cookies that started it all. Made with the finest European butter and a touch of vanilla, these cookies embody the perfect balance of crumbly texture and rich, authentic taste.",
                prepTime: "30 minutes",
                difficulty: "Easy",
                color: "#D4A574",
                ingredients: [
                    "2¾ cups all-purpose flour",
                    "1 cup premium unsalted butter, softened",
                    "½ cup powdered sugar",
                    "¼ cup granulated sugar",
                    "1 large egg yolk",
                    "1 tsp pure vanilla extract",
                    "¼ tsp fine sea salt"
                ],
                doughSteps: [
                    "Cream butter with both sugars until light and fluffy (3-4 minutes)",
                    "Add egg yolk and vanilla, mix until combined",
                    "Gradually blend in flour and salt mixture",
                    "Form dough into a smooth ball, wrap in plastic"
                ],
                bakingSteps: [
                    "Preheat oven to 350°F (175°C)",
                    "Roll dough to ¼ inch thickness",
                    "Cut into elegant shapes or rounds",
                    "Bake for 10-12 minutes until edges are lightly golden"
                ],
                enjoyingTips: [
                    "Cool completely for that perfect crumbly texture",
                    "Store in airtight container for up to 1 week",
                    "Best enjoyed with tea or coffee",
                    "Pro tip: Dust with powdered sugar for special occasions"
                ]
            },
            chocolate: {
                title: "Classic Chocolate Chip Cookies",
                image: "img/recipe-chocolate-chip.jpg",
                story: "The timeless classic that brings back childhood memories. Our version features a perfect balance of crispy edges and chewy centers, loaded with premium semi-sweet chocolate chips.",
                prepTime: "25 minutes",
                difficulty: "Easy",
                color: "#8B4513",
                ingredients: [
                    "2¼ cups all-purpose flour",
                    "1 cup butter, softened",
                    "¾ cup granulated sugar",
                    "¾ cup packed brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "1 tsp baking soda",
                    "1 tsp salt",
                    "2 cups semi-sweet chocolate chips"
                ],
                doughSteps: [
                    "Cream butter and both sugars until fluffy",
                    "Beat in eggs one at a time, then vanilla",
                    "Combine flour, baking soda, and salt separately",
                    "Gradually mix dry ingredients into wet",
                    "Fold in chocolate chips"
                ],
                bakingSteps: [
                    "Preheat oven to 375°F (190°C)",
                    "Drop rounded tablespoons 2 inches apart",
                    "Bake 9-11 minutes until golden brown",
                    "Cool on baking sheet 2 minutes"
                ],
                enjoyingTips: [
                    "Enjoy warm for gooey chocolate experience",
                    "Perfect with cold milk",
                    "Freeze dough balls for fresh cookies anytime",
                    "Store in airtight container with bread slice for softness"
                ]
            },
            snicker: {
                title: "Cinnamon Snickerdoodles",
                image: "img/recipe-snickerdoodles.jpg",
                story: "Soft, chewy cookies rolled in cinnamon sugar that create a delightful crackled surface. These cookies bring warmth and comfort with every bite.",
                prepTime: "35 minutes",
                difficulty: "Medium",
                color: "#D2B48C",
                ingredients: [
                    "2¾ cups all-purpose flour",
                    "2 tsp cream of tartar",
                    "1 tsp baking soda",
                    "½ tsp salt",
                    "1 cup butter, softened",
                    "1½ cups granulated sugar",
                    "2 large eggs",
                    "Rolling Mixture: 3 tbsp sugar + 2 tbsp cinnamon"
                ],
                doughSteps: [
                    "Mix flour, cream of tartar, baking soda, and salt",
                    "Cream butter and sugar until light and fluffy",
                    "Beat in eggs one at a time",
                    "Gradually blend in flour mixture",
                    "Chill dough 30 minutes for best texture"
                ],
                bakingSteps: [
                    "Preheat oven to 375°F (190°C)",
                    "Mix cinnamon and sugar in shallow dish",
                    "Roll dough into walnut-sized balls",
                    "Roll each ball in cinnamon sugar mixture",
                    "Bake 8-10 minutes until set but still soft"
                ],
                enjoyingTips: [
                    "Best served slightly warm",
                    "Perfect autumn treat",
                    "Store soft by adding bread slice to container",
                    "Great with hot apple cider"
                ]
            },
            vanilla: {
                title: "Vanilla Sugar Cookies",
                image: "img/recipe-vanilla-sugar.jpg",
                story: "Simple elegance in cookie form. These versatile vanilla sugar cookies are perfect for decorating or enjoying plain, with a tender crumb and delicate sweetness.",
                prepTime: "45 minutes",
                difficulty: "Medium",
                color: "#F5F5DC",
                ingredients: [
                    "3 cups all-purpose flour",
                    "1 tsp baking powder",
                    "½ tsp salt",
                    "1 cup butter, softened",
                    "1 cup granulated sugar",
                    "1 large egg",
                    "2 tsp vanilla extract",
                    "2 tbsp milk"
                ],
                doughSteps: [
                    "Combine flour, baking powder, and salt",
                    "Cream butter and sugar until fluffy",
                    "Beat in egg, vanilla, and milk",
                    "Gradually add flour mixture",
                    "Divide dough, wrap, chill 1 hour"
                ],
                bakingSteps: [
                    "Preheat oven to 375°F (190°C)",
                    "Roll dough ¼ inch thick on floured surface",
                    "Cut with cookie cutters",
                    "Place on ungreased baking sheets",
                    "Bake 6-8 minutes until edges are lightly golden"
                ],
                enjoyingTips: [
                    "Perfect canvas for royal icing decoration",
                    "Delicious plain with tea",
                    "Ideal for special occasions and holidays",
                    "Freeze cut cookies before baking for cleaner edges"
                ]
            },
            "double-choc": {
                title: "Double Chocolate Cookies",
                image: "img/recipe-double-chocolate.jpg",
                story: "For the chocolate lovers - rich, fudgy cookies with an intense chocolate flavor enhanced by both cocoa powder and chocolate chips.",
                prepTime: "30 minutes",
                difficulty: "Medium",
                color: "#3C1810",
                ingredients: [
                    "1¾ cups all-purpose flour",
                    "¾ cup unsweetened cocoa powder",
                    "1 tsp baking soda",
                    "½ tsp salt",
                    "1 cup butter, softened",
                    "1 cup granulated sugar",
                    "½ cup brown sugar",
                    "2 large eggs",
                    "2 tsp vanilla extract",
                    "1½ cups dark chocolate chips"
                ],
                doughSteps: [
                    "Whisk together flour, cocoa, baking soda, and salt",
                    "Cream butter with both sugars until fluffy",
                    "Beat in eggs and vanilla",
                    "Gradually mix in dry ingredients",
                    "Fold in chocolate chips"
                ],
                bakingSteps: [
                    "Preheat oven to 350°F (175°C)",
                    "Drop rounded tablespoons on parchment-lined sheets",
                    "Bake 8-10 minutes until edges are set",
                    "Centers should still look slightly underbaked"
                ],
                enjoyingTips: [
                    "Best enjoyed slightly warm for fudgy texture",
                    "Perfect with vanilla ice cream",
                    "Store in airtight container for soft texture",
                    "Great for chocolate lovers of all ages"
                ]
            }
        };
    }
}

// Share Recipe Function
function shareRecipe() {
    if (navigator.share) {
        navigator.share({
            title: 'Cookie Recipe from Forever Cookie',
            text: 'Check out this amazing cookie recipe!',
            url: window.location.href
        });
    } else {
        // Fallback: Copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Recipe link copied to clipboard!');
        });
    }
}

// Smooth scroll for internal links
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TreasureWorld();
    smoothScroll();
    
    // Add some entrance animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe recipe cards for entrance animation
    document.querySelectorAll('.recipe-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});