package socc.socc_ufg.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NucleoConhecimento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nucleo;

    @ManyToOne(optional = false)
    @JoinColumn(name = "area_id", nullable = false)
    private Area area;

    @ManyToOne(optional = false)
    @JoinColumn(name = "facilitador_id", nullable = false)
    private Facilitador facilitador;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descricao;

    @ManyToMany
    @JoinTable(name = "nucleo_docentes")
    private List<Docente> docentes;

    @ManyToMany
    @JoinTable(name = "nucleo_disciplinas")
    private List<Disciplina> disciplinas;
}