/* ============================================
   DATA — Mock data compartilhado entre páginas
   Carregado via <script> antes dos scripts da página
   ============================================ */

window.AutoAulaData = (function () {
  const today = new Date();
  const isoDate = (offset) => {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  // ---- Instrutores (lista pública / busca) ----
  const instructors = [
    {
      id: "i1",
      name: "Carlos Silva",
      photo: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?w=400&q=80",
      rating: 4.9,
      reviews: 127,
      experience: 12,
      pricePerHour: 80,
      location: "São Paulo - Zona Sul",
      categories: ["B", "AB"],
      specialties: ["Primeira Habilitação", "Baliza", "Direção Defensiva"],
      car: "Honda Civic 2022",
      bio: "Instrutor experiente com mais de 12 anos de atuação.",
    },
    {
      id: "i2",
      name: "Ana Paula Costa",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
      rating: 4.8,
      reviews: 89,
      experience: 8,
      pricePerHour: 75,
      location: "São Paulo - Zona Oeste",
      categories: ["B"],
      specialties: ["Primeira Habilitação", "Reciclagem"],
      car: "Toyota Corolla 2021",
      bio: "Especialista em alunos iniciantes com ansiedade ao volante.",
    },
    {
      id: "i3",
      name: "Roberto Almeida",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
      rating: 4.7,
      reviews: 203,
      experience: 18,
      pricePerHour: 90,
      location: "São Paulo - Centro",
      categories: ["A", "B", "AB"],
      specialties: ["Moto", "Primeira Habilitação"],
      car: "VW Polo 2023 + Honda CG 160",
      bio: "Instrutor de auto e moto com vasta experiência.",
    },
    {
      id: "i4",
      name: "Juliana Mendes",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
      rating: 5.0,
      reviews: 56,
      experience: 5,
      pricePerHour: 70,
      location: "São Paulo - Zona Norte",
      categories: ["B"],
      specialties: ["Primeira Habilitação", "Estacionamento"],
      car: "Hyundai HB20 2022",
      bio: "Atenciosa e didática, foco em quem tem medo de dirigir.",
    },
    {
      id: "i5",
      name: "Marcelo Santos",
      photo: "https://www.unijui.edu.br/arquivos/tinyMCE4/comunica1/Forma%C3%A7%C3%A3o%20de%20Instrutor%20de%20Tr%C3%A2nsito_Imagem%20Curso.jpg",
      rating: 4.6,
      reviews: 142,
      experience: 15,
      pricePerHour: 85,
      location: "São Paulo - Vila Mariana",
      categories: ["B", "AB"],
      specialties: ["Primeira Habilitação", "Direção Defensiva", "Manobras"],
      car: "Chevrolet Onix 2021",
      bio: "Instrutor paciente e seguro. Especialista em preparação para exame prático com alta taxa de aprovação.",
    },
    {
      id: "i6",
      name: "Fernando Oliveira",
      photo: "https://younder.com.br/wp-content/uploads/2025/11/GettyImages-1335865283.jpg",
      rating: 4.8,
      reviews: 98,
      experience: 10,
      pricePerHour: 78,
      location: "São Paulo - Pinheiros",
      categories: ["B"],
      specialties: ["Primeira Habilitação", "Perfeccionismo de Direção"],
      car: "Fiat Uno 2020",
      bio: "Profissional dedicada com foco em técnica segura e confiança do aluno. Ótima avaliação com alunos novatos.",
    },
    {
      id: "i7",
      name: "Lucas Ferreira",
      photo: "https://images.unsplash.com/photo-1761706726713-8a962d30a622?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4.9,
      reviews: 176,
      experience: 14,
      pricePerHour: 88,
      location: "São Paulo - Vila Olímpia",
      categories: ["A", "B", "AB"],
      specialties: ["Moto Premium", "Primeira Habilitação", "Baliza Profissional"],
      car: "nissan Sentra 2023 + Yamaha MT09",
      bio: "Instrutor experiente em auto e moto. Dedicado a oferecer segurança e técnica impecável em cada aula.",
    },
  ];

  // ---- Perfil do instrutor logado ----
  const profile = {
    name: "Carlos Silva",
    email: "carlos.silva@autoaula.com",
    phone: "(11) 98765-4321",
    photo: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?w=400&q=80",
    bio: "Instrutor experiente com mais de 12 anos de atuação. Especialista em preparar alunos para o exame prático com foco em segurança e confiança ao volante.",
    experience: 12,
    carModel: "Honda Civic 2022",
    carPlate: "ABC-1D23",
    categories: ["B", "AB"],
    specialties: ["Primeira Habilitação", "Baliza", "Direção Defensiva"],
    location: "São Paulo - Zona Sul",
    serviceRadius: 15,
  };

  // ---- Preços ----
  const pricing = {
    basePricePerHour: 80,
    packages: [
      { lessons: 5, discount: 5 },
      { lessons: 10, discount: 10 },
      { lessons: 20, discount: 15 },
    ],
    weekendSurcharge: 20,
    nightSurcharge: 15,
    cancellationPolicy:
      "Cancelamentos com menos de 24h de antecedência terão cobrança de 50% do valor da aula.",
  };

  // ---- Disponibilidade ----
  const availability = {
    workingDays: {
      Segunda: true, Terça: true, Quarta: true, Quinta: true,
      Sexta: true, Sábado: true, Domingo: false,
    },
    workingHours: { start: "08:00", end: "18:00" },
    lunchBreak: { enabled: true, start: "12:00", end: "13:00" },
    minNoticeHours: 12,
    maxAdvanceDays: 30,
    blockedDates: [],
  };

  // ---- Aulas agendadas ----
  const lessons = [
    { id: "l1", studentName: "Maria Oliveira", studentPhone: "(11) 99887-1122", date: isoDate(0), time: "09:00", duration: 1, type: "Primeira Habilitação", pickupLocation: "Av. Paulista, 1000", status: "confirmada", price: 80 },
    { id: "l2", studentName: "João Pedro", studentPhone: "(11) 99554-2233", date: isoDate(0), time: "14:00", duration: 2, type: "Baliza", pickupLocation: "R. Augusta, 500", status: "confirmada", price: 160 },
    { id: "l3", studentName: "Beatriz Lima", studentPhone: "(11) 99332-4455", date: isoDate(1), time: "10:00", duration: 1, type: "Direção Defensiva", pickupLocation: "Vila Madalena", status: "pendente", price: 80 },
    { id: "l4", studentName: "Rafael Souza", studentPhone: "(11) 99221-6677", date: isoDate(2), time: "16:00", duration: 1, type: "Primeira Habilitação", pickupLocation: "Brooklin", status: "confirmada", price: 80 },
    { id: "l5", studentName: "Camila Ferreira", studentPhone: "(11) 99876-8899", date: isoDate(-2), time: "08:00", duration: 2, type: "Estacionamento", pickupLocation: "Moema", status: "concluida", price: 160 },
    { id: "l6", studentName: "Pedro Henrique", studentPhone: "(11) 99445-1010", date: isoDate(-5), time: "15:00", duration: 1, type: "Primeira Habilitação", pickupLocation: "Itaim Bibi", status: "cancelada", price: 80 },
  ];

  // ---- Avaliações ----
  const reviews = [
    { id: "r1", studentName: "Maria Silva", rating: 5, comment: "Excelente instrutor! Muito paciente e didático. Consegui passar de primeira graças às aulas.", date: "15/03/2026", lessonType: "Primeira Habilitação", reply: "Muito obrigado, Maria! Foi um prazer acompanhar sua jornada. Dirija com segurança!" },
    { id: "r2", studentName: "João Santos", rating: 5, comment: "Recomendo muito! Profissional sério e competente. As aulas são muito produtivas.", date: "10/03/2026", lessonType: "Baliza" },
    { id: "r3", studentName: "Ana Costa", rating: 4, comment: "Muito bom instrutor, aprendi bastante. Só acho que poderia ter mais horários disponíveis.", date: "05/03/2026", lessonType: "Direção Defensiva" },
    { id: "r4", studentName: "Lucas Martins", rating: 5, comment: "Aulas práticas, foco nos pontos onde eu tinha mais dificuldade. Super recomendo!", date: "28/02/2026", lessonType: "Primeira Habilitação" },
    { id: "r5", studentName: "Patricia Alves", rating: 4, comment: "Instrutor muito calmo, me deixou confiante ao volante.", date: "20/02/2026", lessonType: "Reciclagem" },
  ];

  // ---- Helpers ----
  const formatBRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatDateBR = (iso) => {
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };
  const showToast = (message) => {
    let t = document.querySelector(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = message;
    t.classList.add("is-visible");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("is-visible"), 2400);
  };

  return {
    instructors, profile, pricing, availability, lessons, reviews,
    formatBRL, formatDateBR, showToast, isoDate,
  };
})();
