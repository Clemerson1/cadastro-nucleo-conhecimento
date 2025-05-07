package socc.socc_ufg.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String nome;
    private String curso;
    private String matriz;
    private int chTeorica;
    private int chPratica;

    public int getChTotal() {
        return chTeorica + chPratica;
    }
}