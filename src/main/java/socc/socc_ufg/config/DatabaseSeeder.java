package socc.socc_ufg.config;

import java.time.LocalDate;
import java.util.Locale;

import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import socc.socc_ufg.model.Area;
import socc.socc_ufg.model.Disciplina;
import socc.socc_ufg.model.Docente;
import socc.socc_ufg.model.Facilitador;
import socc.socc_ufg.repository.AreaRepository;
import socc.socc_ufg.repository.DisciplinaRepository;
import socc.socc_ufg.repository.DocenteRepository;
import socc.socc_ufg.repository.FacilitadorRepository;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder {

    private final AreaRepository areaRepo;
    private final FacilitadorRepository facilitadorRepo;
    private final DocenteRepository docenteRepo;
    private final DisciplinaRepository disciplinaRepo;

    private final Faker faker = new Faker(new Locale("pt-BR"));

    @PostConstruct
    public void init() {
        System.out.println("DatabaseSeeder.init() chamado");
        
        if (areaRepo.count() == 0) {
            for (int i = 0; i < 3; i++) {
                areaRepo.save(new Area(null, "Área " + faker.educator().course()));
            }
        }

        if (facilitadorRepo.count() == 0) {
            for (int i = 0; i < 3; i++) {
                facilitadorRepo.save(new Facilitador(null, faker.name().fullName()));
            }
        }

        if (docenteRepo.count() == 0) {
            for (int i = 0; i < 5; i++) {
                docenteRepo.save(new Docente(
                        null,
                        faker.name().fullName(),
                        faker.internet().emailAddress(),
                        LocalDate.now().minusYears(faker.number().numberBetween(1, 20)),
                        faker.bool().bool() ? "Ativo" : "Inativo"
                ));
            }
        }

        if (disciplinaRepo.count() == 0) {
            for (int i = 0; i < 5; i++) {
                int chTeorica = faker.number().numberBetween(30, 60);
                int chPratica = faker.number().numberBetween(20, 40);
                disciplinaRepo.save(new Disciplina(
                        null,
                        "COD" + faker.number().digits(3),
                        faker.book().title(),
                        "Curso " + faker.educator().campus(),
                        "Matriz " + faker.number().digit(),
                        chTeorica,
                        chPratica
                ));
            }
        }

        System.out.println("Dados fake populados com sucesso!");
    }
}
