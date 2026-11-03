const SUPABASE_URL = 'TU_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'TU_SUPABASE_ANON_KEY';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Cargar catálogo en index.html
async function cargarCatalogo() {
    const contenedor = document.getElementById('catalogo-container');
    if (!contenedor) return;

    const { data: productos, error } = await supabaseClient
        .from('productos')
        .select(`*, subcategorias(nombre)`)
        .order('fecha_registro', { ascending: false });

    if (error) {
        contenedor.innerHTML = '<p style="color:red; text-align:center;">Error al cargar los productos.</p>';
        return;
    }

    if (productos.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; width:100%;">No hay prendas publicadas todavía.</p>';
        return;
    }

    contenedor.innerHTML = '';
    productos.forEach(prod => {
        contenedor.innerHTML += `
            <div class="producto-card">
                <img src="${prod.imagen_url}" alt="Prenda">
                <div class="subcat">${prod.subcategorias?.nombre || 'General'}</div>
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion || ''}</p>
                <div class="precio">$${Number(prod.precio).toFixed(2)}</div>
            </div>
        `;
    });
}
